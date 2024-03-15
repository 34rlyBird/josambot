import mongoose from "mongoose";

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

const scheduleModel = mongoose.model("Schedule", ScheduleSchema);

export default scheduleModel;
