import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VoidUI — Nothing-Inspired Component Library",
  description:
    "A state-of-the-art Next.js UI library inspired by Nothing Brand. Minimalist, dark-first, with fine micro-animations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-dvh antialiased">{children}</body>
    </html>
  );
}
