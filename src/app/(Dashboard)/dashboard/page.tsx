import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React from "react";
import Dashboard from "@/components/Dashboard/E-commerce";

export const metadata: Metadata = {
  title: "Fortik Admin Portal | dashboard",
  description: "Fortik Admin Portal",
};

const BasicDashboardPage: React.FC = () => {
  return (
    <DefaultLayout>
      <Dashboard />
    </DefaultLayout>
  );
};

export default BasicDashboardPage;
