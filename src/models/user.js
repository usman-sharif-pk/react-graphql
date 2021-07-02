const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: "string",
      required: [true, "email is required"],
      unique: [true, "Email already in use"],
    },
    password: { type: "string", required: [true, "password is required"] },
    createdEVents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
  },
  { timestamps: { createdAt: true } }
);

module.exports = mongoose.model("User", userSchema);
