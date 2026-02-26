import { Playfair_Display, Inter } from "next/font/google";
import "../css/style.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

import QuickViewModal from "@/components/Common/QuickViewModal";
import CartSidebarModal from "@/components/Common/CartSidebarModal";
import PreviewSliderModal from "@/components/Common/PreviewSlider";
import ScrollToTop from "@/components/Common/ScrollToTop";
import ClientWrapper from "./ClientWrapper";

const playfair = Playfair_Display({
  subsets: ["latin", "vietnamese"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-inter",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" suppressHydrationWarning={true}>
      <body className={`${playfair.variable} ${inter.variable} font-sans`}>
        <ClientWrapper>
          <Header />
          {children}

          <QuickViewModal />
          <CartSidebarModal />
          <PreviewSliderModal />
          <ScrollToTop />
          <Footer />
        </ClientWrapper>
      </body>
    </html>
  );
}
