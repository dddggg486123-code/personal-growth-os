'use client';

import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopBar } from "@/components/layout/TopBar";
import { MobileNav } from "@/components/layout/MobileNav";
import { useUIStore } from "@/lib/store";
import { useEffect } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const darkMode = useUIStore((s) => s.darkMode);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  return (
    <html lang="zh-CN" className={darkMode ? 'dark' : ''}>
      <head>
        <title>Personal Growth OS — 一点点变强</title>
        <meta name="description" content="帮助长期稳定成长的个人操作系统" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="min-h-screen flex" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <Sidebar />
        <div className="flex-1 flex flex-col min-h-screen lg:ml-64">
          <TopBar />
          <main className="flex-1 p-4 md:p-6 lg:p-8 pb-24 lg:pb-8 overflow-y-auto">
            {children}
          </main>
        </div>
        <MobileNav />
      </body>
    </html>
  );
}
