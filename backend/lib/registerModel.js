import mongoose from "mongoose";

export default function registerModel(name, schema) {
  if (mongoose.models[name]) {
    delete mongoose.models[name];
  }
  return mongoose.model(name, schema);
}
