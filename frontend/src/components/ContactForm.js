import React, { useState } from "react";
import { usePortfolio } from "@/context/PortfolioContext";
import { resolveApiUrl } from "@/lib/apiBaseUrl";
import { COUNTRY_DIAL_CODES, formatPhoneNumber, isValidPhoneNumber } from "@portfoliooo/shared/phone";

const INITIAL_FORM = {
  name: "",
  email: "",
  phoneCountryCode: "+91",
  phone: "",
  subject: "",
  message: "",
};

const ContactForm = ({ className = "" }) => {
  const { content } = usePortfolio();
  const { email } = content.site;
  const [form, setForm] = useState(INITIAL_FORM);
  const [status, setStatus] = useState("idle");
  const [phoneError, setPhoneError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (name === "phone" || name === "phoneCountryCode") {
      setPhoneError("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isValidPhoneNumber(form.phoneCountryCode, form.phone)) {
      setPhoneError("Enter a valid phone number with country code.");
      return;
    }

    setStatus("loading");
    setPhoneError("");

    const phone = formatPhoneNumber(form.phoneCountryCode, form.phone);
    const { phoneCountryCode: _cc, phone: _pn, ...rest } = form;

    try {
      const response = await fetch(resolveApiUrl("/api/contact"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...rest, phone }),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      setForm(INITIAL_FORM);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className={className}>
      <form onSubmit={handleSubmit} className="flex w-full flex-col gap-5" noValidate>
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
        <div className="flex flex-col gap-1.5 text-sm font-medium">
          <span>Phone number</span>
          <div className="flex flex-col gap-2 sm:flex-row">
            <select
              name="phoneCountryCode"
              value={form.phoneCountryCode}
              onChange={handleChange}
              required
              aria-label="Country code"
              className="form-input sm:max-w-[11rem]">
              {COUNTRY_DIAL_CODES.map(({ code, label }) => (
                <option key={code} value={code}>
                  {label}
                </option>
              ))}
            </select>
            <input
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              placeholder="9876543210"
              required
              autoComplete="tel-national"
              inputMode="numeric"
              className="form-input flex-1"
            />
          </div>
          {phoneError ? (
            <p role="alert" className="text-xs text-red-600 dark:text-red-400">
              {phoneError}
            </p>
          ) : (
            <p className="text-xs text-dark/50 dark:text-light/50">Include your number without the country code.</p>
          )}
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
