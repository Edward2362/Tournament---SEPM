const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

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
      validate: {
        validator: validator.isEmail,
        message: "Please provide valid email",
      },
    },
    password: {
      type: String,
      required: [true, "Please provide password"],
      minlength: [8, "Password cannot be shorter than 8 characters"],
      maxlength: [64, "Password cannot be longer than 64 characters"],
    },
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

// TODO: pre .remove

UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model("User", UserSchema);
