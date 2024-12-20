"use client";
import Link from "next/link";
import Image from "next/image";
import { Chat } from "@/types/chat";
import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { GetChatHistoryByAgentID } from "@/redux/chat/API";
import {Button} from "@mui/material"
import { IoIosArrowBack } from "react-icons/io";
const ChatCard: React.FC<any> = ({ id }) => {
  let dispatch = useDispatch<AppDispatch>();
  const { chatHistoryData } = useSelector((state: any) => state.chatSlice);
  const [chatList, setChatList] = useState<any>([]);
  useEffect(() => {
    let data: any = { id: id };
    dispatch(GetChatHistoryByAgentID(data));
  }, [dispatch, id]);

  console.log("chatHistoryData---", chatHistoryData);

  const fethcData = (type: string) => {
    if (type == "today") {
      setChatList(chatHistoryData?.data.today);
    }
    if (type == "yesterday") {
      setChatList(chatHistoryData?.data.yesterday);
    }
    if (type == "last7Days") {
      setChatList(chatHistoryData?.data.past_7_days);
    }
    if (type == "older") {
      setChatList(chatHistoryData?.data.older);
    }
  };

  console.log("chatList----", chatList);
  return (
    <Grid container spacing={2}>
      {/* Chat History Box */}
      <Grid item xs={12} md={4}>
        <div className="flex h-[80vh] flex-col rounded bg-white p-4 shadow-lg dark:bg-boxdark dark:text-white">

          <div className="flex items-center justify-start">
          <Link href={`/agents/view/${id}`}>
          <Button>
            <IoIosArrowBack color="inherit" size={25} />
          </Button>
        </Link>
          <div className="text-lg font-semibold">
            Chat History
          </div>
          </div>
          <div className="flex-1 space-y-4 overflow-y-auto">
            {chatHistoryData?.data != null ? (
              <>
                <div
                  onClick={() => {
                    fethcData("today");
                  }}
                  className="cursor-pointer rounded bg-blue-100 p-2 dark:text-black"
                >
                  Today
                </div>
                <div
                  onClick={() => {
                    fethcData("yesterday");
                  }}
                  className="cursor-pointer rounded bg-blue-100 p-2 dark:text-black"
                >
                  Yesterday
                </div>
                <div
                  onClick={() => {
                    fethcData("last7Days");
                  }}
                  className="cursor-pointer rounded bg-blue-100 p-2 dark:text-black"
                >
                  Last 7 Days
                </div>
                <div
                  onClick={() => {
                    fethcData("older");
                  }}
                  className="cursor-pointer rounded bg-blue-100 p-2 dark:text-black"
                >
                  Older
                </div>
              </>
            ) : (
              <>
                <div className="rounded p-2">No data found</div>
              </>
            )}

            {/* Add more conversations as needed */}
          </div>
        </div>
      </Grid>

      {/* Chat Box */}
      <Grid item xs={12} md={8}>
        <div className="flex h-[80vh] flex-col rounded bg-white p-4 shadow-lg dark:bg-boxdark">
          <h2 className="mb-4 border-b pb-2 text-xl font-semibold">Chat</h2>
          <div className="flex-1 space-y-4 overflow-y-auto">
            {chatList.length > 0 ? (
              chatList.map((item: any, index: number) => (
                <div
                  key={index}
                  className={`max-w-sm rounded p-3 ${item.role === "visitor" ? "ml-auto self-end text-right dark:text-black" : "self-start text-left"} 
                  ${item.role == "visitor" ? "bg-gray-200":"bg-blue-500 text-black" }`}
                >
                  {item?.chat_content}
                </div>
              ))
            ) : (
              <div className="max-w-sm self-end p-3 text-black dark:text-white">
                No Data found.
              </div>
            )}

            {/* Add more chat messages dynamically */}
          </div>
          {/* <div className="mt-4 flex gap-2">
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-1 rounded border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="rounded bg-blue-500 px-6 py-2 text-white hover:bg-blue-600">
              Send
            </button>
          </div> */}
        </div>
      </Grid>
    </Grid>
  );
};

export default ChatCard;
