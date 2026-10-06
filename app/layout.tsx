import type { Metadata } from "next";
import "./globals.css";
import localFont from 'next/font/local'


const gilroy = localFont({
  src: [
    {
      path: '../public/fonts/Gilroy-Medium.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/Gilroy-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-family', 
})

export const metadata: Metadata = {
  title: "Read Journey App",
  description: "A web application for tracking and sharing your reading journey.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${gilroy.variable}`}>
      <body>{children}</body>
    </html>
  );
}
