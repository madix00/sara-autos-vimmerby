import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "./components/utils/Footer";
import Header from "./components/utils/Header";
import PageContainer from "./components/utils/PageContainer";
import { carService } from "./service/carService";
import { ClientToaster } from "./components/utils/ClientToaster";
import Script from "next/script";
import { Providers } from "./providers/providers";
import PromotionBar from "./components/presentation/PromotionBar";

const company_name = carService.getCompanyName();
export const metadata: Metadata = {
  // title: `${company_name} - Köp eller sälj din bil`,
  title: `${company_name}`,
  description: `Välkommen in till ${company_name}`,
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sv" className="bg-background" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        {/* <SnowfallClient /> */}
        <Providers>
          <Header />
          {/* <PromotionBar /> */}

          {children}
          <ClientToaster />
        </Providers>
        <Footer />
      </body>
    </html>
  );
}
