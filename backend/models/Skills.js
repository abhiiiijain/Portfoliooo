import mongoose from "mongoose";

const SkillsSchema = new mongoose.Schema(
  {
    key: { type: String, default: "skills", unique: true },
    title: { type: String, default: "Technical Skills" },
    categories: [
      {
        _id: false,
        name: String,
        skills: [String],
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Skills || mongoose.model("Skills", SkillsSchema);
