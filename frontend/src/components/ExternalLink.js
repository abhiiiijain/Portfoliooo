import Link from "next/link";

export default function ExternalLink({ href, className, children, ...props }) {
  if (!href) {
    return <span className={className}>{children}</span>;
  }

  return (
    <Link href={href} className={className} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </Link>
  );
}
