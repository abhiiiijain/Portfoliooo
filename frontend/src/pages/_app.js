import BackendKeepAlive from "@/components/BackendKeepAlive";
import Footer from "@/components/Footer";
import DynamicFonts from "@/components/DynamicFonts";
import NavBar from "@/components/NavBar";
import AdminGuard from "@/components/admin/AdminGuard";
import { PortfolioProvider, usePortfolio } from "@/context/PortfolioContext";
import { SiteSettingsProvider } from "@/context/SiteSettingsContext";
import { fetchPortfolioContent } from "@/lib/content";
import "@/styles/globals.css";
import { MotionConfig } from "framer-motion";
import Head from "next/head";
import { useRouter } from "next/router";

function AppShell({ Component, pageProps, router }) {
  const { content, error } = usePortfolio();

  return (
    <>
      <DynamicFonts />
      <main className="font-body w-full min-h-screen" suppressHydrationWarning>
        <NavBar />
        {content ? (
          <Component key={router.asPath} {...pageProps} />
        ) : error ? (
          <div className="flex min-h-[50vh] items-center justify-center px-6">
            <p className="text-sm text-dark/60 dark:text-light/60 text-center max-w-md">
              {error}
            </p>
          </div>
        ) : null}
        {content ? <Footer /> : null}
      </main>
    </>
  );
}

export default function App({ Component, pageProps, initialContent }) {
  const router = useRouter();
  const isAdminRoute = router.pathname.startsWith("/admin");
  const isAdminLogin = router.pathname === "/admin/login";

  return (
    <MotionConfig initial={false}>
      <BackendKeepAlive />
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {isAdminRoute ? (
        isAdminLogin ? (
          <Component {...pageProps} />
        ) : (
          <SiteSettingsProvider>
            <AdminGuard>
              <Component {...pageProps} />
            </AdminGuard>
          </SiteSettingsProvider>
        )
      ) : (
        <PortfolioProvider initialContent={initialContent}>
          <AppShell Component={Component} pageProps={pageProps} router={router} />
        </PortfolioProvider>
      )}
    </MotionConfig>
  );
}

App.getInitialProps = async (appContext) => {
  const { ctx, Component } = appContext;
  let pageProps = {};

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  let initialContent = null;
  if (ctx.req && !ctx.pathname?.startsWith("/admin")) {
    try {
      initialContent = await fetchPortfolioContent();
    } catch {
      initialContent = null;
    }
  }

  return { pageProps, initialContent };
};
