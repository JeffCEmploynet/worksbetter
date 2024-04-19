import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
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
          <div className="flex flex-col bg-gray-50">
            <Header/>
            {children}
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
