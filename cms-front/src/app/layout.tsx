import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { PrimeReactProvider } from "primereact/api";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SUCIT - CMS Frontend",
  description: "Frontend CMS con Next.js y PrimeReact",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.variable}`}>
        <PrimeReactProvider value={{ ripple: true }}>
          <Providers>
            {children}
          </Providers>
        </PrimeReactProvider>
      </body>
    </html>
  );
}
