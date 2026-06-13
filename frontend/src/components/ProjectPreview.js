import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const FramerImage = motion(Image);

function isHttpUrl(value) {
  return typeof value === "string" && /^https?:\/\//i.test(value.trim());
}

function ProjectEmbed({ url, title, featured = false }) {
  return (
    <div
      className={`relative w-full overflow-hidden rounded-xl border border-solid border-dark bg-light dark:border-light ${
        featured ? "aspect-[16/10]" : "aspect-[3/2]"
      }`}>
      <iframe
        src={url}
        title={`${title} live preview`}
        className="absolute inset-0 h-full w-full border-0 pointer-events-none"
        loading="lazy"
        tabIndex={-1}
      />
    </div>
  );
}

export default function ProjectPreview({
  image,
  link,
  title,
  featured = false,
  href,
  className = "",
  priority = false,
}) {
  const hasImage = Boolean(image?.trim());
  const embedUrl = isHttpUrl(link) ? link.trim() : null;
  const showEmbed = !hasImage && embedUrl;
  const wrapperClass = `${className}${href ? " cursor-pointer" : ""}`;

  const content = hasImage ? (
    <FramerImage
      src={image}
      alt={title}
      width={featured ? 800 : 600}
      height={featured ? 500 : 400}
      className="w-full h-auto rounded-xl border border-solid border-dark dark:border-light"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
      priority={priority}
      sizes={
        featured
          ? "(max-width: 769px) 100vw, (max-width:1200px) 50vw, 50vw"
          : "(max-width: 769px) 100vw, 50vw"
      }
    />
  ) : showEmbed ? (
    <ProjectEmbed url={embedUrl} title={title} featured={featured} />
  ) : (
    <div
      className={`flex w-full items-center justify-center rounded-xl border border-dashed border-dark/25 bg-dark/5 text-sm text-dark/50 dark:border-light/25 dark:bg-light/5 dark:text-light/50 ${
        featured ? "aspect-[16/10]" : "aspect-[3/2]"
      }`}>
      No preview available
    </div>
  );

  if (!href) {
    return <div className={wrapperClass}>{content}</div>;
  }

  return (
    <Link href={href} className={`block ${wrapperClass}`} target="_blank" rel="noopener noreferrer">
      {content}
    </Link>
  );
}
