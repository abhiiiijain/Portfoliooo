export default function SectionHeading({ title, className = "", variant = "section" }) {
  const variantClass =
    variant === "card"
      ? "text-2xl font-bold mb-6 text-left text-dark dark:text-light"
      : "font-bold text-3xl md:text-4xl lg:text-5xl text-center mb-10 lg:mb-8 text-dark dark:text-light";

  return (
    <h2 className={`${variantClass} ${className}`.trim()}>
      {title}
    </h2>
  );
}
