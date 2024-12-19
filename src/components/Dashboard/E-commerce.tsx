"use client";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import ChartOne from "../Charts/ChartOne";
import ChartTwo from "../Charts/ChartTwo";
import ChatCard from "../Chat/ChatCard";
import TableOne from "../Tables/TableOne";
import CardDataStats from "../CardDataStats";
import { TbVirus } from "react-icons/tb";
import { LuDatabase } from "react-icons/lu";
import { useSelector } from "react-redux";

const MapOne = dynamic(() => import("@/components/Maps/MapOne"), {
  ssr: false,
});

const ChartThree = dynamic(() => import("@/components/Charts/ChartThree"), {
  ssr: false,
});

const Dashboard: React.FC = () => {
  const { current_user } = useSelector((state: any) => state.Auth_States);
  // to check is authenticated
  console.log("current_user dashboard---", current_user);

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardDataStats
          title="High Severity incidents"
          total="7"
          rate={null}
          main_title="Active Threats"
          levelUp
        >
          <TbVirus size={20} />
        </CardDataStats>
        <CardDataStats
          main_title="Endpoint Health"
          title="Healthy endpoints"
          total="98%"
          rate={null}
          levelUp
        >
          <LuDatabase size={20} />
        </CardDataStats>
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <div className="col-span-12 xl:col-span-8">
          <TableOne />
        </div>
        <ChatCard />
        <ChartOne />
        <ChartTwo />
        <ChartThree />
        <MapOne />
      </div>
    </>
  );
};

export default Dashboard;
