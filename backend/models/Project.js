import mongoose from "mongoose";
import registerModel from "../lib/registerModel";

const ProjectSchema = new mongoose.Schema(
  {
    title: String,
    type: String,
    tech: String,
    summary: String,
    link: String,
    github: String,
    image: String,
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default registerModel("Project", ProjectSchema);
