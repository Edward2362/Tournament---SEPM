const mongoose = require("mongoose");
const isEmail = require("validator/lib/isEmail");
const bcrypt = require("bcryptjs");
const axios = require("axios");

const { NotFoundError } = require("../errors");
const trelloConfig = require("../config/trello");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please provide username"],
      minlength: [4, "Name cannot be shorter than 4 characters"],
      maxlength: [50, "Name cannot be longer than 50 characters"],
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Please provide email"],
      validate: [isEmail, "Please provide valid email"],
    },
    password: {
      type: String,
      required: [true, "Please provide password"],
      minlength: [8, "Password cannot be shorter than 8 characters"],
      maxlength: [64, "Password cannot be longer than 64 characters"],
    },
    // ? ...
    avatar: {
      type: String,
      default: "",
    },
    trelloToken: {
      type: String,
      default: "",
    },
    trelloId: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
  },
  { timestamps: true }
);

UserSchema.pre("remove", async function () {
  await this.model("Member").deleteMany({ user: this._id });
});

UserSchema.pre("save", async function () {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  if (this.isModified("trelloToken")) {
    const response = await axios.get(
      `${trelloConfig.baseUrl}/members/me?key=${trelloConfig.appKey}&token=${this.trelloToken}`
    );
    this.avatar = response.data.avatarUrl + "/50.png";
  }
});

UserSchema.statics.findOneExist = async function (queryObject) {
  const user = await this.model("User").findOne(queryObject);
  if (!user) {
    throw new NotFoundError();
  }
  return user;
};

module.exports = mongoose.model("User", UserSchema);
