import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NavBar } from "./shared/NavBar";
import { TanStackProvider } from "./tanstack-provider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Smithy Energy",
  description: "Smithy Energy | Full Stack",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <body className="antialiased">
        <TanStackProvider>
          <NavBar />
          {children}
        </TanStackProvider>
      </body>
    </html>
  );
}
