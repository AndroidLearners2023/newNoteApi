const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret_key = "bunty";

const signUp = async (req, resp) => {
  // existing user check
  // hash password generate
  // user creation
  // token generate

  const { username, password, email } = req.body;
  try {
    const existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
      return resp.status(400).json({ message: "User already exists.." });
    }

    // const hashPassword = await bcrypt.hash(password, 10);

    const result = await userModel.create({
      email: email,
      password: password, //hashPassword,
      username: username,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, secret_key);
    resp.status(201).json({ user: result, token: token });
  } catch (error) {
    console.log(error);
    resp.status(400).json({ message: "Something went wrong" });
  }
};

const signIn = async (req, resp) => {
  const { email, password } = req.body;
  try {
    const existingUser = await userModel.findOne({ email: email });
    if (!existingUser) {
      return resp.status(404).json({ message: "User not found.." });
    }

    // const hashPassword = await bcrypt.hash(password, 10);

    const existingPassword = await userModel.findOne({ password: password });

    if (!existingPassword) {
      return resp.status(400).json({ message: "Invalid credintials.." });
    }

    // const matchedPassword = await bcrypt.compare(
    //   password,
    //   existingUser.password
    // );

    // if (!matchedPassword) {
    //     return resp.status(400).json({ message: "Invalid credintials.." });
    //   }

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      secret_key
    );
    resp.status(201).json({ user: existingUser, token: token });
  } catch (error) {
    console.log(error);
    resp.status(400).json({ message: "Something went wrong" });
  }
};

module.exports = { signIn, signUp };
