import mongoose from "mongoose";

const { Schema } = mongoose;

const donateSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  amount: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Donate", donateSchema);
