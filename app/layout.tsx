// src/app/layout.tsx
import React from "react";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>VectorVetted - Resume Matching</title>
      </head>
      <body className="bg-gray-50 text-gray-900">
        <header className="bg-blue-500 p-4 text-white text-center">
          <h1 className="text-xl font-bold">VectorVetted - Resume Match</h1>
        </header>
        <main className="container mx-auto p-4">{children}</main>
        <footer className="bg-blue-500 p-4 text-white text-center">
          <p>&copy; 2024 VectorVetted</p>
        </footer>
      </body>
    </html>
  );
}
