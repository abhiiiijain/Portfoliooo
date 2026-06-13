import React, { useState } from "react";
import { usePortfolio } from "@/context/PortfolioContext";

const ContactForm = ({ className = "" }) => {
  const { content } = usePortfolio();
  const { email } = content.site;
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState("idle");

  const handleChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("loading");

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
      const response = await fetch(`${apiUrl}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      setForm({ name: "", email: "", subject: "", message: "" });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className={className}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full max-w-xl" noValidate>
        <div className="grid sm:grid-cols-2 gap-5">
          <label className="flex flex-col gap-1.5 text-sm font-medium">
            Name
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your name"
              required
              autoComplete="name"
              className="form-input"
            />
          </label>
          <label className="flex flex-col gap-1.5 text-sm font-medium">
            Email
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
              autoComplete="email"
              className="form-input"
            />
          </label>
        </div>
        <label className="flex flex-col gap-1.5 text-sm font-medium">
          Subject
          <input
            name="subject"
            value={form.subject}
            onChange={handleChange}
            placeholder="What's this about?"
            className="form-input"
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm font-medium">
          Message
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Tell me about your project or opportunity…"
            required
            rows={5}
            className="form-input resize-y min-h-[120px]"
          />
        </label>
        <button type="submit" disabled={status === "loading"} className="btn-primary self-start">
          {status === "loading" ? "Sending…" : "Send message"}
        </button>
        {status === "success" && (
          <p
            role="status"
            className="text-sm text-primary dark:text-primaryDark bg-primary/5 dark:bg-primaryDark/10 px-4 py-3 rounded-lg border border-primary/20">
            Message sent successfully.
          </p>
        )}
        {status === "error" && (
          <p
            role="alert"
            className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 px-4 py-3 rounded-lg border border-red-200 dark:border-red-900">
            Could not send your message. Please email{" "}
            <a href={`mailto:${email}`} className="underline underline-offset-2">
              {email}
            </a>{" "}
            directly.
          </p>
        )}
      </form>
    </div>
  );
};

export default ContactForm;
