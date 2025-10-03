import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/auth-context";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "TechXygen - Full-Stack Development & Cloud Solutions",
  description: "Software development company specializing in React, Node.js, Python, Java Spring Boot, mobile apps, and cloud deployment with AWS, Azure, GCP. Colombo-based with CI/CD automation and DevOps practices.",
  keywords: ["React development", "Node.js", "Python", "Java Spring Boot", "mobile app development", "AWS", "Azure", "GCP", "Docker", "Kubernetes", "CI/CD", "DevOps", "PostgreSQL", "MongoDB", "Sri Lanka", "Colombo"],
  authors: [{ name: "TechXygen" }],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [
      { url: "/favicon.png", sizes: "180x180" },
    ],
  },
  openGraph: {
    title: "TechXygen - Full-Stack Development & Cloud Solutions",
    description: "Software development company specializing in React, Node.js, Python, Java Spring Boot, mobile apps, and cloud deployment with AWS, Azure, GCP. Colombo-based with CI/CD automation and DevOps practices.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "TechXygen - Full-Stack Development & Cloud Solutions",
    description: "Software development company specializing in React, Node.js, Python, Java Spring Boot, mobile apps, and cloud deployment with AWS, Azure, GCP. Colombo-based with CI/CD automation and DevOps practices.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
