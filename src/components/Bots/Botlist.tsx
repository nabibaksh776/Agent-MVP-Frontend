"use client";
import React, { useState, useEffect } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { AiOutlinePlus } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { AppDispatch } from "@/redux/store";
import { GetALLAgentsByCustomerID } from "@/redux/Agents/Apis";
// BotsList Component

const BostList: React.FC<any> = ({ id }) => {
  let dispatch = useDispatch<AppDispatch>();
  const { allAgents } = useSelector((state: any) => state.AgentsSlice);
  console.log("id is----", id);

  console.log("allAgents is----", allAgents);

  useEffect(() => {
    if (id) {
      dispatch(GetALLAgentsByCustomerID({ id }));
    }
  }, [dispatch, id]);

  return (
    <Box>
      <Box className="mb-4 mt-4">
        <Box className="text-title-md font-bold text-black dark:text-white">
          Agents
        </Box>
      </Box>
      <Box className="h-screen min-h-[500px] rounded-md bg-white p-8 shadow-md dark:bg-boxdark">
        <Grid container spacing={4}>
          {allAgents?.data?.data?.map((item: any, index: number) => {
            return (
              <Grid
                key={index}
                item
                xl={3}
                lg={3}
                md={4}
                sm={12}
                className="flex items-center justify-center"
              >
                <Link href={`/agents/view/${item?.id}`}>
                  <Box className="flex cursor-pointer flex-col items-center justify-center">
                    <img
                      alt="chatbot image"
                      src={
                        item?.logo !== null
                          ? `${process.env.NEXT_PUBLIC_API_URL}${item?.logo}`
                          : "https://img.freepik.com/free-vector/graident-ai-robot-vectorart_78370-4114.jpg?t=st=1733320935~exp=1733324535~hmac=1985180c42ca62306ae1175b91b4db0a7b7309dd4e63e0f86007e8cf18672aa5&w=826"
                      }
                      style={{
                        width: "80px",
                        height: "80px",
                        borderRadius: "50%",
                        border: "1px solid lightgray",
                        objectFit: "cover", // Ensures the image covers the container without stretching
                      }}
                    />
                    <Box className="mt-2 flex items-center justify-center">
                      <p className="text-lg font-bold text-black dark:text-white">
                        {item?.name}
                      </p>
                    </Box>
                  </Box>
                </Link>
              </Grid>
            );
          })}

          <Grid
            item
            xl={3}
            lg={3}
            md={3}
            sm={12}
            className="flex items-center justify-center"
          >
            <Link href={`/agents/create/${id}`}>
              <Box className="flex cursor-pointer flex-col items-center justify-center">
                <Box
                  className="flex items-center justify-center bg-primary"
                  sx={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "50px",
                  }}
                >
                  <AiOutlinePlus size={20} className="text-white" />
                </Box>
              </Box>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default BostList;
