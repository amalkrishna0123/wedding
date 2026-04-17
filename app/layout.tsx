import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jesnyjerrin.vercel.app/"),
  title: "Jerrin & Jesny | The Wedding",
  description: "Join us as we begin forever. A cinematic wedding journey.",
  openGraph: {
    title: "Jerrin & Jesny | The Wedding",
    description: "Join us as we begin forever. A cinematic wedding journey.",
    url: "https://jesnyjerrin.vercel.app/",
    siteName: "The Wedding of Jerrin and Jesny",
    images: [{ url: "/assets/Us/1.jpeg", width: 1200, height: 1600 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jerrin & Jesny | The Wedding",
    description: "Join us as we begin forever. A cinematic wedding journey.",
    images: ["/assets/Us/1.jpeg"],
  },
};

import AudioPlayer from "@/components/AudioPlayer";
import CustomCursor from "@/components/CustomCursor";
import { AudioProvider } from "@/context/AudioContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} h-full antialiased light`}>
      <body className="min-h-full font-sans bg-white text-black selection:bg-black/10 selection:text-black antialiased">
        <AudioProvider>
          <CustomCursor />
          {children}
          <AudioPlayer />
        </AudioProvider>
      </body>
    </html>
  );
}
