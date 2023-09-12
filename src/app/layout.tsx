import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "~/styles/globals.css";
import Header from "~/components/Header";

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
      </body>
    </html>
  );
}

// Todo: Add a footer
// todo: add detail route
// todo: add admin route
// todo: add items view
// todo: add update item view
// todo: add insert item view
// todo: add delete item button
// todo: add update/insert/delete success/failure banner
// todo: write readme
// todo: add unit tests
// todo: change color to match squadjobs
// extra: add cart functionality
// extra: add auth function on admin page
