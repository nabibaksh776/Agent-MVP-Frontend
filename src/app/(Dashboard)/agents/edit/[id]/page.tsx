import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React from "react";
import EditAgent from "@/components/Bots/EditAgent";

// meta data for each page
export const metadata: Metadata = {
  title: "Agent MVP | Edit Agent",
  description: "Agent MVP",
};

interface BostListPageProps {
  params: {
    id: string;
  };
}



// 
// 
// 
// 
// 
const EditAgentPage: React.FC<BostListPageProps> = ({ params }) => {
  const { id } = params;
  return (
    <DefaultLayout>
      <EditAgent id={id} />
    </DefaultLayout>
  );
};

export default EditAgentPage;
