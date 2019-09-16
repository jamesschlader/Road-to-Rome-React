const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  first: { type: String, required: true },
  last: String,
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: {
    type: String,
    validate: {
      validator: function(target) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(target);
      },
      message: props => `${props} is not a valid email.`
    }
  },
  motto: { type: String },
  stable: [Schema.Types.ObjectId],
  image: { type: String }
});

const User = mongoose.model("User", UserSchema);

module.exports = { User, UserSchema };
