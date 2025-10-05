import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Suraj Yadav - AI/ML & Backend Engineer",
  description: "Full-stack developer specializing in AI/ML and backend engineering. Explore my projects, blog posts, and case studies.",
  keywords: "AI, ML, Backend, Full Stack, Developer, Portfolio, Next.js, MongoDB",
  authors: [{ name: "Suraj Yadav" }],
  openGraph: {
    title: "Suraj Yadav - AI/ML & Backend Engineer",
    description: "Full-stack developer specializing in AI/ML and backend engineering",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth dark">
      <body className={`${inter.className} antialiased bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white min-h-screen`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
