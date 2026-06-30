import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/app/components/site/Navbar";
import { Footer } from "@/app/components/site/Footer";
import { ThemeProvider } from "@/app/components/ThemeProvider";
import { LanguageProvider } from "@/app/components/LanguageProvider";

export const metadata: Metadata = {
  title: "StepUp for SDG — Global Education Impact Platform",
  description:
    "Uniting students, schools, NGOs and companies to advance SDG 4 — Quality Education — through transparent, measurable impact.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ThemeProvider>
          <LanguageProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
