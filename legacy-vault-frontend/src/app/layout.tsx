// [ID: E7U1W3X] - Root Layout Wrapper
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext"; // <--- Import

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LegacyVault",
  description: "Secure Digital Inheritance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Wrap everything in AuthProvider */}
        <AuthProvider> 
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}