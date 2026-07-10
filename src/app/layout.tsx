import type { Metadata } from "next";
import Script from "next/script";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { themeInitScript } from "@/components/theme/theme-script";

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
});

export const metadata: Metadata = {
  title: {
    default: "PresyoGas PH · Metro Manila Fuel Prices",
    template: "%s · PresyoGas PH",
  },
  description:
    "Compare gasoline and diesel pumps across Metro Manila—tables, map explorer, calculators, and community-ready forms.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${sans.variable} h-full scroll-smooth`}
    >
      <body className="flex min-h-full flex-col bg-slate-50 font-sans antialiased dark:bg-slate-950">
        <Script id="presyogas-theme-init" strategy="beforeInteractive">
          {themeInitScript}
        </Script>
        <ThemeProvider>
          <SiteHeader />
          <div className="flex-1">{children}</div>
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
