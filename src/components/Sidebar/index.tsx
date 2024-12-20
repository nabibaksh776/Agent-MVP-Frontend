"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import SidebarItem from "@/components/Sidebar/SidebarItem";
import ClickOutside from "@/components/ClickOutside";
import useLocalStorage from "@/hooks/useLocalStorage";
import { Typography, Box } from "@mui/material";
import { LuUsers } from "react-icons/lu";
import { LuSettings } from "react-icons/lu";
import { MdDashboard } from "react-icons/md";
import { useSelector } from "react-redux";
interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const pathname = usePathname();
  const [pageName, setPageName] = useLocalStorage("selectedMenu", "dashboard");
  const [sidebar, setSideBar] = useState<any>([]);
  const { current_user } = useSelector((state: any) => state.Auth_States);

  console.log("current_user in sidebar--", current_user);
  const updateSidebar = (role: any) => {
    let menuGroups: any = [];
    if (role == "admin") {
      menuGroups = [
        {
          name: null,
          menuItems: [
            {
              icon: <MdDashboard size={20} />,
              label: "Dashboard",
              route: "/dashboard",
              children: null,
            },
          ],
        },
        {
          name: null,
          menuItems: [
            {
              icon: <LuUsers size={20} />,
              label: "Customers",
              route: "/customer",
              children: null,
            },
          ],
        },
        {
          name: "User",
          menuItems: [
            {
              icon: <LuUsers size={20} />,
              // label: "AI-Powered Threat Management",
              label: "Profile",
              route: "/profile",
              children: null,
            },
            {
              icon: <LuSettings size={20} />,
              // label: "AI-Powered Threat Management",
              label: "Settings",
              route: "#",
              children: null,
            },
          ],
        },
      ];
      setSideBar(menuGroups);
    } else {
      menuGroups = [
        {
          name: null,
          menuItems: [
            {
              icon: <MdDashboard size={20} />,
              label: "Dashboard",
              route: `/dashboard`,
              children: null,
            },
          ],
        },
        {
          name: null,
          menuItems: [
            {
              icon: <LuUsers size={20} />,
              label: "Agents",
              route: `/agents/${current_user?.data ? current_user?.data?.data.id : ""}`,
              children: null,
            },
          ],
        },
        {
          name: "User",
          menuItems: [
            {
              icon: <LuUsers size={20} />,
              // label: "AI-Powered Threat Management",
              label: "Profile",
              route: "/profile",
              children: null,
            },
            {
              icon: <LuSettings size={20} />,
              // label: "AI-Powered Threat Management",
              label: "Settings",
              route: "#",
              children: null,
            },
          ],
        },
      ];
      setSideBar(menuGroups);
    }
  };

  useEffect(() => {
    if (current_user?.data?.data?.role == "admin") {
      updateSidebar("admin");
    } else {
      updateSidebar("customer");
    }
  }, [current_user]);

  return (
    <ClickOutside onClick={() => setSidebarOpen(false)}>
      <aside
        className={`fixed left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-white duration-300 ease-linear dark:bg-boxdark lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* <!-- SIDEBAR HEADER --> */}
        {/* LOGO */}
        <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
          <Box className="flex w-full items-center justify-center">
            <Link
              href="/dashboard"
              className="text-center text-xl font-bold text-black dark:text-white"
            >
              AGENT MVP
            </Link>
          </Box>

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            className="block lg:hidden"
          >
            <svg
              className="fill-current"
              width="20"
              height="18"
              viewBox="0 0 20 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
                fill=""
              />
            </svg>
          </button>
        </div>
        {/* <!-- SIDEBAR HEADER --> */}
        <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
          {/* <!-- Sidebar Menu --> */}
          <nav className="px-4 pb-4 lg:px-6">
            {sidebar.map((group: any, groupIndex: any) => (
              <div key={groupIndex}>
                <h3 className="font-200 mb-4 ml-4 text-sm text-bodydark2">
                  {group.name}
                </h3>

                <ul className="mb-6 flex flex-col gap-1.5">
                  {group.menuItems.map((menuItem: any, menuIndex: any) => (
                    <SidebarItem
                      key={menuIndex}
                      item={menuItem}
                      pageName={pageName}
                      setPageName={setPageName}
                    />
                  ))}
                </ul>
              </div>
            ))}
          </nav>
          {/* <!-- Sidebar Menu --> */}
        </div>
      </aside>
    </ClickOutside>
  );
};

export default Sidebar;
