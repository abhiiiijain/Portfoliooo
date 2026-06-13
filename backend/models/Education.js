import mongoose from "mongoose";
import registerModel from "../lib/registerModel";

const EducationSchema = new mongoose.Schema(
  {
    type: String,
    trade: String,
    time: String,
    place: String,
    info: String,
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default registerModel("Education", EducationSchema);
