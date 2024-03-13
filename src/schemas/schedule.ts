import mongoose = require("mongoose");
const { Schema } = mongoose;

const ScheduleSchema = new Schema({
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
})

const scheduleModel = mongoose.model("Schedule", ScheduleSchema);

export default scheduleModel;