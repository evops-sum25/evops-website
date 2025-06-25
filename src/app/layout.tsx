import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EvOps",
  description: "Share and discover local events!",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
