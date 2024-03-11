import mongoose from "mongoose";

const { Schema } = mongoose;

const scheduleSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  offday: {
    type: String,
    enum: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    required: true
  }
});

module.exports = mongoose.model("Schedule", scheduleSchema);