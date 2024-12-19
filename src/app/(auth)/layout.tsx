// app/dashboard/layout.tsx
"use client";
import { ReactNode } from "react";
// layout of Dashborad
export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <section>
      <main>{children}</main>
    </section>
  );
}
