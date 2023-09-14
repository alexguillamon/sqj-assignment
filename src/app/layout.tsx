import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@uploadthing/react/styles.css";

import "~/styles/globals.css";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import TanstackProvider from "../utils/TanstackProvider";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "SquadJobs Store",
  description: "SquadJobs's amazing tech store",
  openGraph: {
    title: "TechSquadJobs Shop",
    description: "SquadJobs's amazing tech store",
    url: "https://squadjobs.com/",
    siteName: "SquadJobs Shop",
  },
};

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={["font-sans", fontSans.variable].join(" ")}>
        <TanstackProvider>
          <Header />
          {props.children}
          <Footer />
        </TanstackProvider>
      </body>
    </html>
  );
}
