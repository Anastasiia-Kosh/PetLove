import type { Metadata } from "next";
import "./globals.css";
import { Manrope } from "next/font/google";
import Header from "@/components/Header/Header";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-family",
});

export const metadata: Metadata = {
  title: "PetLove",
  description:
    "A pet adoption platform that connects loving homes with furry friends in need.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${manrope.variable}`}>
      <body>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
