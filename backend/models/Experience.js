import mongoose from "mongoose";
import registerModel from "../lib/registerModel";

const ExperienceSchema = new mongoose.Schema(
  {
    position: String,
    company: String,
    companyLink: String,
    time: String,
    address: String,
    bullets: [String],
    tech: String,
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default registerModel("Experience", ExperienceSchema);
