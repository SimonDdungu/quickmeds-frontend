import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { PrimeReactProvider } from 'primereact/api';
import 'primeicons/primeicons.css';
import "./globals.css";
import { NavBar, SideBar } from "@/components/Global";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "QuickMeds",
  description: "QuickMeds",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased  `}
      >
        <PrimeReactProvider>
          <div className="flex min-h-screen">
              <SideBar />
              <main className="flex-1 bg-slate-100">
                <NavBar />
                <div className="p-6">
                  {children}
                </div>
              </main>
          </div>
        </PrimeReactProvider>
      </body>
    </html>
  );
}
