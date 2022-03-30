const { StatusCodes } = require("http-status-codes");

const User = require("../models/User");
const validatePassword = require("../utils/validatePassword");
const { responseWithToken } = require("../utils/jwt");

const register = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    // check if email is duplicated
    const isEmailDuplicated = await User.findOne({ email });
    if (isEmailDuplicated) {
        throw new Error("Email already exists");
    }

    // automatically assign admin for the first account
    // anyone has access to the database can change this later
    const isFirstAccount = (await User.countDocuments({})) === 0;
    const role = isFirstAccount ? "admin" : "user";

    const user = await User.create({
        firstName,
        lastName,
        email,
        password,
        role,
    });

    // add cookies to response
    const tokenUser = { firstName, lastName, email, role };
    responseWithToken(res, tokenUser);

    res.status(StatusCodes.CREATED).json({ data: tokenUser });
};

const login = async (req, res) => {
    const { email, password } = req.body;

    // check for bad request
    if (!email || !password) {
        throw new Error("Please provide email and password");
    }

    // check if email exists
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error("Invalid Credentials");
    }

    // check if password matches
    const isPasswordMatch = await validatePassword({
        saved: user.password,
        toValidate: password,
    });
    if (!isPasswordMatch) {
        throw new Error("Invalid Credentials Pass");
    }

    // add cookies to response
    const tokenUser = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
    };
    responseWithToken(res, tokenUser);

    res.status(StatusCodes.OK).json({ data: tokenUser });
};

module.exports = {
    register,
    login,
};

module.exports.logout = (req, res) => {
    res.cookie("tokenUser", "", { maxAge: 1 });
    res.redirect("/");
};