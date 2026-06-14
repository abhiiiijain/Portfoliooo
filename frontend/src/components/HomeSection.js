export function PageGlow() {
  return (
    <div className="hero-glow" aria-hidden="true">
      <div className="absolute -left-1/4 top-0 h-[320px] w-[320px] rounded-full bg-primary/8 blur-3xl dark:bg-primaryDark/8" />
      <div className="absolute -right-1/4 top-12 h-[240px] w-[240px] rounded-full bg-primary/5 blur-3xl dark:bg-primaryDark/5" />
    </div>
  );
}

export function HomeSection({ children, className = "" }) {
  return (
    <section className={`border-t border-dark/10 dark:border-light/10 ${className}`}>
      <div className="mx-auto w-full max-w-5xl px-8 pb-16 pt-10 md:px-6 md:pb-12 md:pt-8 sm:px-4 sm:pb-10">
        {children}
      </div>
    </section>
  );
}

export function ContentPanel({ icon, title, children, footer, className = "" }) {
  return (
    <article
      className={`rounded-2xl border border-primary/25 bg-light/90 p-5 shadow-sm backdrop-blur-sm transition-shadow hover:shadow-md dark:border-primaryDark/25 dark:bg-[#141414]/90 sm:p-4 ${className}`}>
      {title || icon ? (
        <div className="mb-4 flex items-center gap-2.5 text-primary dark:text-primaryDark">
          {icon}
          {title ? (
            <h2 className="text-lg font-bold tracking-tight text-dark dark:text-light">{title}</h2>
          ) : null}
        </div>
      ) : null}
      {children}
      {footer ? (
        <div className="mt-5 border-t border-dark/10 pt-4 dark:border-light/10">{footer}</div>
      ) : null}
    </article>
  );
}
