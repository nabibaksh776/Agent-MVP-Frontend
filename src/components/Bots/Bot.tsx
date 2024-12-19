"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<any>([]);
  const [input, setInput] = useState<string>("");
  const [historyVisible, setHistoryVisible] = useState<boolean>(false); // State to toggle chat history visibility
  const [loading, setLoading] = useState(false);

  const handleGiveResponseTemp = () => {
    let newMsg: any = {
      role: "bot",
      message: "We are working on that so this message is just for testing..",
    };

    setTimeout(() => {
      setMessages((preData: any) => {
        return [...preData, newMsg];
      });
      setLoading(false);
    }, 5000);
  };

  const handleSendMessage = () => {
    let ipnutMsg = input.trim();
    if (ipnutMsg !== "") {
      setLoading(true);
      let newMsg: any = { role: "user", message: input };
      setMessages((preData: any) => {
        return [...preData, newMsg];
      });
      setInput(""); // clear input field
      handleGiveResponseTemp();
    }
  };

  const toggleHistory = () => {
    setHistoryVisible((prev) => !prev); // Toggle the visibility of chat history
  };

  const chatHistory = [
    {
      title: "user Chat History",
    },
    {
      title: "user Chat History",
    },
    {
      title: "user Chat History",
    },
    {
      title: "user Chat History",
    },
    {
      title: "user Chat History",
    },
  ];

  return (
    <Box
      className="flex flex-col sm:flex-row"
      sx={{
        height: "800px",
        position: "relative", // To position the toggle button
      }}
    >
      {/* Button to Toggle Chat History (visible on small screens) */}
      <Button
        variant="contained"
        color="primary"
        onClick={toggleHistory}
        sx={{
          display: { xs: "block", sm: "none" }, // Only show on small screens
        }}
      >
        {historyVisible ? "Hide History" : "Show History"}
      </Button>

      {/* Chat History Sidebar (visible on small screens and large screens) */}
      <Box
        className={`${
          historyVisible ? "translate-x-0" : "-translate-x-full"
        } fixed bottom-0 left-0 top-0 z-10 w-full flex-col bg-gray-200 p-4 transition-transform duration-300 ease-in-out sm:relative sm:block sm:w-80 sm:translate-x-0
        bg-white dark:bg-boxdark
        `}
        sx={{
          maxWidth: "300px",
          height: "100%",
        }}
        >
        <Typography variant="h6" className="mb-4 font-semibold">
          Chat History
        </Typography>
        <List className="flex-1 overflow-auto">
          {chatHistory.map((msg, index) => (
            <ListItem key={index} className="mb-2">
              <ListItemText primary={msg.title} />
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Chat Area */}
      <Box className="flex-1 p-4 ">
        <div className="flex h-full flex-col">
          <div className="mb-4 flex-1 overflow-auto bg-gray-100 p-4 bg-white dark:bg-boxdark">
            <div className="space-y-4">
              {messages.map((item: any, index: number) => {
                return (
                  <div
                    key={index}
                    className={`max-w-xs rounded-lg p-2 text-white ${
                      item.role === "user"
                        ? "ml-auto bg-blue-500"
                        : "mr-auto bg-gray-500"
                    }`}
                  >
                    <Typography>{item.message}</Typography>
                  </div>
                );
              })}

              {loading == true ? (
                <>
                  <div>Thinking...</div>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
          {/* Chat Input */}
          <div className="relative flex items-center">
            <TextField
              variant="outlined"
              fullWidth
              value={input}
              onChange={(e) => setInput(e.target.value)}
              label="Type a message"
              className="mr-4"
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                if (loading === false) {
                  handleSendMessage();
                }
              }}
              disabled={input.trim() == "" || loading == true ? true : false}
            >
              Send
            </Button>
          </div>
        </div>
      </Box>
    </Box>
  );
};

export default ChatBot;
