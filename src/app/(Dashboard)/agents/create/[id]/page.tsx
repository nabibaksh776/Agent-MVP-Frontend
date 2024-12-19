import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React from "react";
import ChatBotCommponent from "@/components/Bots/CreateBot";

// meta data for each page
export const metadata: Metadata = {
  title: "Fortik Admin Portal | Bot List",
  description: "Fortik Admin Portal",
};

interface BostListPageProps {
  params: {
    id: string;
  };
}

const BostListPage: React.FC<BostListPageProps> = ({ params }) => {
  const { id } = params;

  
  return (
    <DefaultLayout>
      <ChatBotCommponent id={id} />
    </DefaultLayout>
  );
};

export default BostListPage;
