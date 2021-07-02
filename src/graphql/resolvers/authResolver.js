const bcrypt = require("bcrypt");

const {  User } = require("../../models");

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
};
