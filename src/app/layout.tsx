import type { Metadata } from 'next';
import { Inter } from 'next/font/google'; // Using Inter as a default sans-serif font
import './globals.css';
import { Toaster } from "@/components/ui/toaster"; // Import Toaster

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' }); // Define variable

export const metadata: Metadata = {
  title: 'ResumeForge - Build Your Resume', // Updated title
  description: 'Easily create professional resumes using pre-defined templates.', // Updated description
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}> {/* Use font variable */}
        {children}
        <Toaster /> {/* Add Toaster component */}
      </body>
    </html>
  );
}
