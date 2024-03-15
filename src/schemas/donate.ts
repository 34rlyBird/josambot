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

const donateModel = mongoose.model("Donate", donateSchema);

export default donateModel;
