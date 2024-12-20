import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React from "react";
import Chat from '@/components/Chat/ChatCard'
import ChatHistory from '@/components/Chat/History'

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
const ChatHistoryPage: React.FC<BostListPageProps> = ({ params }) => {
  const { id } = params;
  return (
    <DefaultLayout>
      <ChatHistory id={id}/>
    </DefaultLayout>
  );
};

export default ChatHistoryPage;
