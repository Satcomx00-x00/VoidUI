import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "VoidUI",
    template: "%s · VoidUI",
  },
  description:
    "VoidUI — A minimalist, dark-first Next.js UI component library inspired by Nothing Brand.",
  applicationName: "VoidUI",
  authors: [{ name: "VoidUI" }],
  creator: "VoidUI",
  metadataBase: new URL("https://voidui.dev"),
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactElement {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
