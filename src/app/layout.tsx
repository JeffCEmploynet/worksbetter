import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/header/header";
import { AuthProvider } from "./auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Temp Works-Better",
  description: "The Next Gen Temp App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Header/>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
