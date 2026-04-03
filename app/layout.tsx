import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Jerrin & Jesny | The Wedding",
  description: "Join us as we begin forever. A cinematic wedding journey.",
};

import AudioPlayer from "@/components/AudioPlayer";
import CustomCursor from "@/components/CustomCursor";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} h-full antialiased dark`}>
      <body className="min-h-full font-sans bg-black text-white selection:bg-white/20 selection:text-white antialiased">
        <CustomCursor />
        {children}
        <AudioPlayer />
      </body>
    </html>
  );
}
