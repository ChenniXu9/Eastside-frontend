import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkLoaded, ClerkLoading, ClerkProvider, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Link from "next/link";
import localFont from 'next/font/local';

const inter = Inter({ subsets: ['latin'] });

const customFont = localFont({ 
  src: '../../public/fonts/AvenirLTStd-Roman.otf',
  variable: '--font-custom',
});

export const metadata: Metadata = {
  title: "Eastside Connect",
  description: "Platform to connect eastsiders!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.className} ${customFont.variable}`}>
      <ClerkProvider>
        <body className={`${inter.className} ${customFont.variable}`}>
          <div className="bg-slate-100 font-custom">
            {children}
          </div>
        </body>
      </ClerkProvider>
    </html>
  );
}
