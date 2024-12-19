import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React from "react";
import BostListPageComponent from "@/components/Bots/Botlist";

// meta data for each page
export const metadata: Metadata = {
  title: "Agent MVP | Bot List",
  description: "Agent mvp dashboard",
};

const BostListPage: React.FC = () => {
  return (
    <DefaultLayout>
      <BostListPageComponent />
    </DefaultLayout>
  );
};

export default BostListPage;
