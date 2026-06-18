import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hello from Loom",
  description:
    "A minimal test project for the Loom MVP pipeline — a static landing page verifying the agentic build flow.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-slate-900 antialiased">
        {children}
      </body>
    </html>
  );
}
