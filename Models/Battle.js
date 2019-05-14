const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BattleSchema = new Schema({
  ArenaId: { type: Schema.Types.ObjectId, required: true },
  playerOne: Schema.Types.ObjectId,
  playerTwo: Schema.Types.ObjectId,
  winner: Schema.Types.ObjectId,
  purse: Number,
  scheduled: { type: Boolean, default: true }
});

const Battle = mongoose.model("Battle", BattleSchema);

module.exports = { Battle, BattleSchema };
