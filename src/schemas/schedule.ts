import mongoose from "mongoose";

const { Schema } = mongoose;

export type Schedule = {
  id: string;
  offday: string;
};

// Schema for offday schedule of each member
const ScheduleSchema = new Schema<Schedule>({
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

/**
 * Model can insert, update and so on.
 * {id: string, offday: string}
 */
const scheduleModel = mongoose.model<Schedule>("Schedule", ScheduleSchema);

export default scheduleModel;
