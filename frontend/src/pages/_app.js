import BackendKeepAlive from "@/components/BackendKeepAlive";
import Footer from "@/components/Footer";
import DynamicFonts from "@/components/DynamicFonts";
import NavBar from "@/components/NavBar";
import AdminGuard from "@/components/admin/AdminGuard";
import { PortfolioProvider, usePortfolio } from "@/context/PortfolioContext";
import { SiteSettingsProvider } from "@/context/SiteSettingsContext";
import "@/styles/globals.css";
import { MotionConfig } from "framer-motion";
import Head from "next/head";
import { useRouter } from "next/router";

function AppShell({ Component, pageProps, router }) {
  const { content, loading, error } = usePortfolio();

  if (loading) {
    return (
      <main className="font-body w-full min-h-screen flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="h-1 w-40 mx-auto bg-primary/20 dark:bg-primaryDark/20 rounded-full overflow-hidden">
            <div className="h-full w-1/3 bg-primary dark:bg-primaryDark animate-pulse" />
          </div>
          <p className="text-sm text-dark/60 dark:text-light/60">Loading portfolio…</p>
        </div>
      </main>
    );
  }

  if (error || !content) {
    return (
      <main className="font-body w-full min-h-screen flex items-center justify-center px-6">
        <div className="max-w-md text-center space-y-2">
          <p className="text-lg font-semibold text-dark dark:text-light">Unable to load portfolio</p>
          <p className="text-sm text-dark/60 dark:text-light/60">
            {error || "Content could not be loaded from the API."}
          </p>
        </div>
      </main>
    );
  }

  return (
    <>
      <DynamicFonts />
      <main className="font-body w-full min-h-screen" suppressHydrationWarning>
        <NavBar />
        <Component key={router.asPath} {...pageProps} />
        <Footer />
      </main>
    </>
  );
}

export default function App({ Component, pageProps }) {
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
        <PortfolioProvider>
          <AppShell Component={Component} pageProps={pageProps} router={router} />
        </PortfolioProvider>
      )}
    </MotionConfig>
  );
}
