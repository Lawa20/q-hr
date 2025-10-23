import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { SocketProvider } from "@/contexts/SocketContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import AppLayout from "@/components/Layout/AppLayout";
import RTLWrapper from "@/components/common/RTLWrapper";
import ErrorBoundary from "@/components/common/ErrorBoundary";
import { ThemeProvider } from "@/contexts/ThemeContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Q HR - Modern HR Management System",
  description: "A modern, scalable, and responsive HR Management System with face recognition and GPS tracking",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`${inter.className} bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100 transition-colors duration-200`}>
        <ErrorBoundary>
          <LanguageProvider>
            <RTLWrapper>
              <AuthProvider>
                <SocketProvider>
                  <ThemeProvider>
                    <AppLayout>
                      {children}
                    </AppLayout>
                  </ThemeProvider>
                </SocketProvider>
              </AuthProvider>
            </RTLWrapper>
          </LanguageProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}