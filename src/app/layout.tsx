import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const customFont = localFont({
    src: "../../public/fonts/AvenirLTStd-Roman.otf",
    variable: "--font-custom",
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
                <body
                    className={`${inter.className} ${customFont.variable} bg-white dark:bg-[#151c2c] text-#224c6b`}
                >
                    {children}
                </body>
            </ClerkProvider>
        </html>
    );
}
