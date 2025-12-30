import type { Metadata } from "next";
import { PrivyProvider } from "@/components/PrivyProvider";
import "../styles/index.css";

export const metadata: Metadata = {
  title: "Verisart Wallet",
  description: "Manage your wallet with Verisart",
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
      <body className="h-full">
        <PrivyProvider>{children}</PrivyProvider>
      </body>
    </html>
  );
}
