import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "~/styles/globals.css";
import Header from "~/components/Header";
import Footer from "~/components/Footer";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "TechStore",
  description: "TechStore's amazing tech store",
  openGraph: {
    title: "TechStore",
    description: "TechStore's amazing tech store",
    url: "https://squadjobs.com/",
    siteName: "TechStore",
  },
};

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={["font-sans", fontSans.variable].join(" ")}>
        <Header />
        {props.children}
        <Footer />
      </body>
    </html>
  );
}
