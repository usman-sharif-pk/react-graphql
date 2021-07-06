const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User } = require("../../models");

module.exports = {
  createUser: async function (args) {
    const { userInput } = args;

    try {
      const { password, email } = userInput;
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error("User already exists", 400);
      }
      const hashedPassword = await bcrypt.hash(password, 12);

      const user = await User.create({ email, password: hashedPassword });
      return { ...user._doc, password: undefined };
    } catch (error) {
      throw error;
    }
  },

  login: async function ({ email, password }) {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error("User does not exists");
      }

      if (!(await bcrypt.compare(password, user.password))) {
        throw new Error("Password did not match");
      }
      const { JWT_ACCESS_SECRET } = process.env;
      const payload = { id: user.id, email: user.email };
      return await jwt.sign(payload, JWT_ACCESS_SECRET, { expiresIn: "1h" });
    } catch (error) {
      console.log("ERROR while logging in", error);
      throw new Error(error.message);
    }
  },
};
