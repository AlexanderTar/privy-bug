import type { Metadata } from "next";
import { Providers } from "@/components/WagmiProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Privy Wallet Test App",
  description: "Test app for Privy wallet signMessage/verifyMessage",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="h-full bg-background">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
