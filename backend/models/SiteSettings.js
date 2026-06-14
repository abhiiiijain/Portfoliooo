import mongoose from "mongoose";

const SiteSettingsSchema = new mongoose.Schema(
  {
    key: { type: String, default: "site", unique: true },
    name: String,
    brand: String,
    logoInitials: String,
    email: String,
    whatsapp: String,
    resumeUrl: String,
    experienceStartDate: String,
    social: {
      github: String,
      linkedin: String,
    },
    fonts: {
      body: { type: String, default: "outfit" },
      heading: { type: String, default: "orbitron" },
    },
    nav: [{ href: String, title: String }],
    footer: {
      tagline: String,
      description: String,
      quickLinksTitle: String,
      projectsTitle: String,
      showGithubInQuickLinks: { type: Boolean, default: true },
      maxProjects: Number,
      quickLinks: [
        {
          label: String,
          href: String,
          external: { type: Boolean, default: false },
        },
      ],
    },
    pages: mongoose.Schema.Types.Mixed,
  },
  { timestamps: true }
);

if (mongoose.models.SiteSettings) {
  delete mongoose.models.SiteSettings;
}

export default mongoose.model("SiteSettings", SiteSettingsSchema);
