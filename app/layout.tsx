import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/lib/auth";
import { ThemeProvider } from "@/lib/theme";
import { Footer } from "@/components/ui/Footer";
import { CookieConsent } from "@/components/ui/CookieConsent";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { GoogleTagManager, GoogleTagManagerNoScript } from "@/components/GoogleTagManager";

export const metadata: Metadata = {
  title: "I Want My Lawyer Present - Legal Rights Merchandise",
  description: "Premium merchandise celebrating your constitutional rights. Shop our collection of apparel, accessories, and educational materials.",
  metadataBase: new URL("https://iwantmylawyerpresent.com"),
  manifest: "/manifest.json",
  icons: {
    icon: "/logos/amp-logo.jpeg",
    apple: [
      { url: "/logos/amp-logo.jpeg" },
      { url: "/logos/amp-logo.jpeg", sizes: "180x180", type: "image/jpeg" },
    ],
  },
  keywords: ["Legal Rights", "Constitutional Rights", "Legal Merchandise", "Know Your Rights", "Legal Education", "Apparel", "Accessories"],
  authors: [{ name: "I Want My Lawyer Present" }],
  creator: "I Want My Lawyer Present",
  publisher: "I Want My Lawyer Present",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "I Want My Lawyer Present",
  },
  openGraph: {
    title: "I Want My Lawyer Present - Legal Rights Merchandise",
    description: "Premium merchandise celebrating your constitutional rights. Shop our collection of apparel, accessories, and educational materials.",
    url: "https://iwantmylawyerpresent.com",
    siteName: "I Want My Lawyer Present",
    type: "website",
    images: [
      {
        url: "/logos/amp-logo.jpeg",
        width: 1200,
        height: 630,
        alt: "I Want My Lawyer Present Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "I Want My Lawyer Present - Legal Rights Merchandise",
    description: "Premium merchandise celebrating your constitutional rights.",
    images: ["/logos/amp-logo.jpeg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* eslint-disable-next-line compat/compat */}
        <meta name="theme-color" content="#38bdf8" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="manifest" href="/manifest.json" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/service-worker.js');
                });
              }
            `,
          }}
        />
      </head>
      <body className="font-sans text-text antialiased">
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <>
            <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID} />
            <GoogleTagManagerNoScript gtmId={process.env.NEXT_PUBLIC_GTM_ID} />
          </>
        )}
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        )}
        <ThemeProvider>
          <AuthProvider>
            {children}
            <Footer />
            <CookieConsent />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
