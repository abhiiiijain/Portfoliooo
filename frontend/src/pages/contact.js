import AnimatedText from "@/components/AnimatedText";
import ContactForm from "@/components/ContactForm";
import Layout from "@/components/Layout";
import TransitionEffect from "@/components/TransitionEffect";
import Head from "next/head";
import Link from "next/link";
import { usePortfolio } from "@/context/PortfolioContext";

export default function Contact() {
  const { content } = usePortfolio();
  const { site } = content;
  const page = site.pages.contact;

  return (
    <>
      <Head>
        <title>{page.title}</title>
        <meta name="description" content={page.description} />
      </Head>
      <TransitionEffect />
      <main className="w-full dark:text-light">
        <Layout className="pt-16">
          <span className="text-primary dark:text-primaryDark font-semibold text-sm uppercase tracking-widest">
            {page.label}
          </span>
          <AnimatedText
            text={page.headline}
            className="!text-5xl !text-left lg:!text-center md:!text-4xl sm:!text-3xl mt-4 mb-6"
          />
          <p className="text-dark/70 dark:text-light/70 max-w-2xl mb-10 leading-relaxed md:text-center md:mx-auto">
            {page.intro}
          </p>

          <div className="grid lg:grid-cols-3 gap-12 max-w-5xl">
            <div className="lg:col-span-2">
              <ContactForm />
            </div>
            <aside className="space-y-6 lg:pt-2">
              {site.email && (
                <div>
                  <p className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                    Email
                  </p>
                  <Link
                    href={`mailto:${site.email}`}
                    className="font-medium text-primary dark:text-primaryDark hover:underline">
                    {site.email}
                  </Link>
                </div>
              )}
              {site.whatsapp && (
                <div>
                  <p className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                    WhatsApp
                  </p>
                  <Link
                    href={site.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-primary dark:text-primaryDark hover:underline">
                    Chat on WhatsApp
                  </Link>
                </div>
              )}
            </aside>
          </div>
        </Layout>
      </main>
    </>
  );
}
