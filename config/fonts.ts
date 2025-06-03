import { Inter } from "next/font/google";
import localFont from 'next/font/local';

export const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

// Load Cal Sans locally
export const calSans = localFont({
  src: "../public/fonts/CalSans-Regular.ttf",
  variable: "--font-cal",
  display: "swap",
});
