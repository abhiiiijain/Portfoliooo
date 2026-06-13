import Head from "next/head";
import { usePortfolio } from "@/context/PortfolioContext";
import {
  buildGoogleFontsHref,
  resolveBodyFont,
  resolveHeadingFont,
} from "@/lib/fonts";

export default function DynamicFonts() {
  const { content } = usePortfolio();
  const bodyFont = resolveBodyFont(content?.site?.fonts?.body);
  const headingFont = resolveHeadingFont(content?.site?.fonts?.heading);
  const href = buildGoogleFontsHref([bodyFont.family, headingFont.family]);

  return (
    <Head>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link key={href} href={href} rel="stylesheet" />
      <style>{`
        :root {
          --font-body: '${bodyFont.family}', system-ui, sans-serif;
          --font-heading: '${headingFont.family}', system-ui, sans-serif;
        }
      `}</style>
    </Head>
  );
}
