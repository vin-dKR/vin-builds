import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "OnlyFans - VinodKR",
    description: "This is builds for VinodKR's clients.",
    openGraph: {
        title: "OnlyFans - VinodKR",
        description: "This is builds for VinodKR's clients.",
        images: [
            {
                url: "/imgs/of.jpg",
                width: 1200,
                height: 630,
                alt: "VinodKR's Portfolio Preview",
            },
        ],
        type: "website",
        locale: "en_US",
    },
    twitter: {
        card: "summary_large_image",
        title: "OnlyFans - VinodKR",
        description: "This is builds for VinodKR's clients.",
        images: ["/imgs/of-x.jpg"],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased font-sora`}
            >
                {children}
            </body>
        </html>
    );
}
