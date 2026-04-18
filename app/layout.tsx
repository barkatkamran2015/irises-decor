import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Irises Decor | Party and Wedding Decoration",
  description:
    "Book floral party decor, wedding styling, birthday setups, and private event decoration with Irises Decor.",
  icons: {
    icon: "/irises-logo.svg"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
