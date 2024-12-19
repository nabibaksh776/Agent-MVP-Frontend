"use client";
import "jsvectormap/dist/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/css/satoshi.css";
import "@/css/style.css";
import "@/css/global.css";
import React, { useEffect, useState } from "react";
import ReduxProvider from "@/redux/ReduxProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Layout in app
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <ReduxProvider>
          {/* for toast messages */}
          <ToastContainer />
          <div className="dark:bg-boxdark-2 dark:text-bodydark" style={{height : '100%'}}>{children}</div>
        </ReduxProvider>
      </body>
    </html>
  );
}
