import mongoose = require("mongoose");

const { Schema } = mongoose;

const ScheduleSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  offday: {
    type: String,
    enum: ["월", "화", "수", "목", "금"],
    required: true,
  },
});

module.exports = mongoose.model("Schedule", ScheduleSchema);
