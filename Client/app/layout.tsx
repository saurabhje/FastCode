import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import React from "react";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "../lib/utils";
import { ThemeProvider } from "@/components/theme-Provider";
import NavBar from "@/components/navbar";
import GapiContext from "./gapiProvider";
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});


export const metadata: Metadata = {
  title: "KeyScripter | Your code typing practice ground",
  description:
    "Improve your coding speed and accuracy with our innovative typing practice app! Designed specifically for coders, our app provides a fun and engaging way to enhance your skills by offering a variety of code snippets to type. Track your progress, earn rewards, and compete with friends or colleagues to become a coding master. Whether you're a beginner or an experienced developer, our app is perfect for anyone looking to boost their productivity and efficiency in writing code.",
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
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NavBar />
          <GapiContext>
            {children}
          </GapiContext>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}