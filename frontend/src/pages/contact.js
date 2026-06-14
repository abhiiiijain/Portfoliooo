import AnimatedText from "@/components/AnimatedText";
import ContactForm from "@/components/ContactForm";
import Layout from "@/components/Layout";
import TransitionEffect from "@/components/TransitionEffect";
import { ContentPanel, PageGlow } from "@/components/HomeSection";
import { ChatIcon, MailIcon } from "@/components/icons/PageIcons";
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
        <Layout className="relative pt-16">
          <PageGlow />
          <span className="relative text-sm font-semibold uppercase tracking-widest text-primary dark:text-primaryDark">
            {page.label}
          </span>
          <AnimatedText
            text={page.headline}
            className="relative !mt-4 !text-5xl !text-left lg:!text-center md:!text-4xl sm:!text-3xl"
          />
          <p className="relative mb-10 max-w-2xl leading-relaxed text-dark/70 dark:text-light/70 md:mx-auto md:text-center">
            {page.intro}
          </p>

          <div className="relative grid gap-12 lg:grid-cols-3">
            <ContentPanel
              icon={<MailIcon className="h-4 w-4 shrink-0" />}
              title="Send a message"
              className="lg:col-span-2">
              <ContactForm />
            </ContentPanel>

            <aside className="space-y-4">
              {(site.email || site.whatsapp) && (
                <ContentPanel title="Direct contact">
                  <div className="space-y-5">
                    {site.email ? (
                      <div>
                        <p className="mb-1 flex items-center gap-2 text-xs uppercase tracking-wider text-dark/50 dark:text-light/50">
                          <MailIcon className="h-3.5 w-3.5" />
                          Email
                        </p>
                        <Link
                          href={`mailto:${site.email}`}
                          className="text-sm font-medium text-primary hover:underline dark:text-primaryDark">
                          {site.email}
                        </Link>
                      </div>
                    ) : null}
                    {site.whatsapp ? (
                      <div>
                        <p className="mb-1 flex items-center gap-2 text-xs uppercase tracking-wider text-dark/50 dark:text-light/50">
                          <ChatIcon className="h-3.5 w-3.5" />
                          WhatsApp
                        </p>
                        <Link
                          href={site.whatsapp}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-medium text-primary hover:underline dark:text-primaryDark">
                          Chat on WhatsApp
                        </Link>
                      </div>
                    ) : null}
                  </div>
                </ContentPanel>
              )}
            </aside>
          </div>
        </Layout>
      </main>
    </>
  );
}
