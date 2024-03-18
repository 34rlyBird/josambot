import mongoose from "mongoose";

const { Schema } = mongoose;

// Schema for donation
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

/**
 * Model can insert, update and so on
 * {name: string, amount: number}
 */
const donateModel = mongoose.model("Donate", donateSchema);

export default donateModel;
