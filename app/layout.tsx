import type { Metadata } from 'next';
// Fix: Import ReactNode to resolve the type error.
import type { ReactNode } from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: 'Artistic Photo Style Converter | AI Art Generator',
  description: 'Upload or capture a photo, choose an artistic style like cartoon, sketch, or anime, and let AI transform your image. Save and share your masterpiece.',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-900 text-white font-sans">{children}</body>
    </html>
  );
}
