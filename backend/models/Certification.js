import mongoose from "mongoose";
import registerModel from "../lib/registerModel";

const CertificationSchema = new mongoose.Schema(
  {
    title: String,
    company: String,
    date: String,
    link: String,
    image: String,
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default registerModel("Certification", CertificationSchema);
