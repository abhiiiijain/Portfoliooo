import { useEffect } from "react";

function getResumeEmbedUrl(url) {
  if (!url) return url;

  const driveMatch = url.match(/drive\.google\.com\/file\/d\/([^/]+)/);
  if (driveMatch) {
    return `https://drive.google.com/file/d/${driveMatch[1]}/preview`;
  }

  return url;
}

export default function ResumeViewerModal({ open, url, title = "Resume", onClose }) {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open || !url) return null;

  const embedUrl = getResumeEmbedUrl(url);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-3">
      <button
        type="button"
        aria-label="Close resume"
        className="absolute inset-0 bg-dark/70 dark:bg-black/75 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="resume-modal-title"
        className="relative flex h-[min(90vh,820px)] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-dark/10 bg-light shadow-2xl dark:border-light/10 dark:bg-dark">
        <header className="flex shrink-0 items-center justify-between gap-4 border-b border-dark/10 px-5 py-3 dark:border-light/10">
          <h2 id="resume-modal-title" className="font-heading text-base font-semibold">
            {title}
          </h2>
          <div className="flex items-center gap-3">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-dark/60 underline underline-offset-2 hover:text-dark dark:text-light/60 dark:hover:text-light">
              Open in tab
            </a>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-dark/70 transition hover:bg-dark/5 hover:text-dark dark:text-light/70 dark:hover:bg-light/10 dark:hover:text-light">
              <span className="text-2xl leading-none">&times;</span>
            </button>
          </div>
        </header>
        <div className="min-h-0 flex-1 bg-white dark:bg-slate-900">
          <iframe
            src={embedUrl}
            title={title}
            className="h-full w-full border-0"
            allow="fullscreen"
          />
        </div>
      </div>
    </div>
  );
}
