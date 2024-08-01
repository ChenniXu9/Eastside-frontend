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
      <body className={inter.className}>
          <div className="w-[30%] flex items-center gap-4 xl:gap-8 justify-end">
            <ClerkLoading>
              <div className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-gray-500 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white" />
            </ClerkLoading>
            <ClerkLoaded>
              <SignedIn>
                <div className="cursor-pointer">
                  <Link href="/dashboard/channels">
                  channel
                  </Link>
                </div>
                <UserButton></UserButton>
              </SignedIn>
              <SignedOut>
                <div className="flex items-center gap-2 text-sm">
                  <Link href="/sign-in">Login/Register</Link>
                  <Link href="/dashboard/channels">
                    channel
                  </Link>
                </div>
              </SignedOut>
            </ClerkLoaded>
          </div>
          <div className=" bg-slate-100">
            {children}
          </div>
        </body>
      </ClerkProvider>
    </html>
  );
}
