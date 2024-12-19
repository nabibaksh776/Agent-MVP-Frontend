// app/dashboard/layout.tsx
"use client";
import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import { useSelector } from "react-redux";
import Loader from "@/components/common/Loader";
// layout of Dashborad
export default function DashboardLayout({ children }: { children: ReactNode }) {
  let { GetCurrentUser } = useAuth();
  const { current_user } = useSelector((state: any) => state.Auth_States);
  const [loading, setloading] = useState(true);

  let getCurrentUser = async () => {
    await GetCurrentUser();
  };

  useEffect(() => {
    if (current_user?.data !== null && current_user.error == null) {
      setloading(false);
    }
  }, [current_user]);

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <section>
      <main style={{flexGrow : "1"}}>{loading == true ? <Loader /> : children}</main>
    </section>
  );
}
