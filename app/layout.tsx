import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./myReusableComponents/Header";
import { Toaster } from "@/components/ui/sonner";
import StoreEmail from "@/components/ui/StoreEmail";
import { client } from '@/lib/appwriteConfig';
import { Analytics } from "@vercel/analytics/next";
import Footer from "@/components/Footer";
import { GlobalLoaderProvider } from "@/components/providers/GlobalLoaderProvider";

if (typeof window !== 'undefined') {
  const sessionCookie = document.cookie;
  client.setSession(sessionCookie);
}

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OneStopShop", 
  description: "Your favorite e-commerce store",
  icons: {
    icon: '/favicon.ico',
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white md:bg-transparent
                    flex flex-col min-h-screen`} // <-- make body a flex column
      >
        <GlobalLoaderProvider>
          <Header />
          <StoreEmail />
          
          <main className="flex-grow">
            {children}
          </main>

          <Footer />
          <Toaster visibleToasts={3} />
          <Analytics />
        </GlobalLoaderProvider>
      </body>
    </html>
  );
}
