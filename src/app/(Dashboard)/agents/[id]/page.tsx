import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React from "react";
import ChatBot from "@/components/Bots/Bot";
import BostListPageComponent from "@/components/Bots/Botlist";

// meta data for each page
export const metadata: Metadata = {
  title: "Agent MVP | Agents List",
  description: "Agent MVP",
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
      {/* it is a chatbot */}
      <BostListPageComponent id={id} />
    </DefaultLayout>
  );
};

export default BostListPage;
