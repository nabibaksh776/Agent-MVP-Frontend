import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React from "react";
import ChatBotCommponent from "@/components/Bots/CreateBot";

// meta data for each page
export const metadata: Metadata = {
  title: "Fortik Admin Portal | Bot List",
  description: "Fortik Admin Portal",
};

const BostListPage: React.FC = () => {
  return (
    <DefaultLayout>
      <ChatBotCommponent />
    </DefaultLayout>
  );
};

export default BostListPage;
