import type { Metadata } from "next";
import "./globals.scss";
import BottomNavigation from "@/components/layout/bottom-nav";

export const metadata: Metadata = {
  title: "ECG Guard App | Zen Bachtiar",
  description:
    "ECG Guard App is a Progressive Web App (PWA) for real-time ECG monitoring built with Next.js, WebSockets, and NextAuth for user authentication. This monolithic application integrates with Supabase for database management and user storage. The app provides users with a seamless experience for tracking and visualizing ECG data on both web and mobile platforms.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-black max-w-md mx-auto">
        <div className="min-h-screen flex flex-col relative">
          <div className="absolute top-0 p-1 w-full text-xs text-center z-10 ">
            Designed & Developed by{" "}
            <span className="pl-1 italic text-blue-500">Zen Bachtiar</span>
          </div>
          {children}
          <BottomNavigation />
        </div>
      </body>
    </html>
  );
}
