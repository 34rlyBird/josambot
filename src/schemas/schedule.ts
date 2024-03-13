import mongoose = require("mongoose");
const { Schema } = mongoose;

const ScheduleSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  offday: {
    type: String,
    enum: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    required: true
  }
})

module.exports = mongoose.model("Schedule", ScheduleSchema);
