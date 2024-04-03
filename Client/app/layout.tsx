import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import React from "react";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster"
import { cn } from "../lib/utils";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Code Typing Practice: Improve Your Coding Skills | Programmer's Keyboard Exercises",
  description: "Enhance your programming speed and accuracy with our typing exercises designed for programmers. Practice coding and boost your productivity.",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
