import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Link } from "@heroui/link";
import clsx from "clsx";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontSans, calSans } from "@/config/fonts";
import { Navbar } from "@/components/navbar";
// import { Sidebar } from "@/components/Sidebar";
import { Sidebar } from "@/components/Sidebar2";
import { motion } from "framer-motion";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen text-foreground font-sans antialiased",
          "bg-[#0a0118]",
          fontSans.variable,
          calSans.variable
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <Sidebar />
          <div className="relative flex flex-col h-full w-full">
            <Navbar />
            <main className="container mx-auto max-w-7xl pt-16 flex-grow">
              {children}
            </main>
            <footer className="w-full flex items-center justify-center py-3">
              <Link
                isExternal
                className="flex items-center gap-1 text-current"
                href="https://heroui.com?utm_source=next-app-template"
                title="heroui.com homepage"
              >
                {/* <span className="text-default-600">Powered by</span>
                <p className="text-primary">HeroUI</p> */}
              </Link>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
