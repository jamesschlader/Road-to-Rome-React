const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const SALT_ROUNDS = 12;

const UserSchema = new Schema({
  first: {
    type: String,
    required: true,
    trim: true,
    match: [/\D/g, "please only use letters in the first name"],
    minlength: [1, "please provide a first name"],
    maxlength: [30, "first name cannot be more than 30 characters"]
  },
  last: {
    type: String,
    required: true,
    match: [/\D/g, "please only use letters in the last name"],
    trim: true,
    minlength: [1, "please provide a last name"],
    maxlength: [40, "last name cannot be more than 40 characters"]
  },
  username: {
    type: String,
    required: true,
    trim: true,
    minlength: [5, "username must be at least 5 characters"],
    maxlength: [30, "username cannot be more than 30 characters"]
  },
  password: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    minlength: [8, "password must be at least 8 characters"],
    maxlength: [100, "password cannot be more than 100 characters"]
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "given input is not a valid email address"
    ]
  },
  motto: {
    type: String,
    trim: true,
    maxlength: [220, "the motto cannot exceed 220 characters"]
  },
  stable: [Schema.Types.ObjectId],
  image: { type: String }
});

UserSchema.pre("save", async function preSave(next) {
  const user = this;
  if (!user.isModified("password")) return next();
  try {
    const hash = await bcrypt.hash(user.password, SALT_ROUNDS);
    user.password = hash;
    return next();
  } catch (err) {
    return next(err);
  }
});

UserSchema.methods.comparePassword = async function comparePassword(candidate) {
  return await bcrypt.compare(candidate, this.password);
};

const User = mongoose.model("User", UserSchema);

module.exports = { User, UserSchema };
