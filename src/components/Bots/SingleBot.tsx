"use client";
import React, { useState, useEffect, useRef } from "react";
import { Box, Grid, Typography, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { AppDispatch } from "@/redux/store";
import {
  GetSingleAgentById,
  AgentDocumentUpload,
  DeleteAgentById,
  DeleteAgentDocumentById,
} from "@/redux/Agents/Apis";
import CircularProgress from "@mui/material/CircularProgress";
import { RESET_DELETE_AGENT } from "@/redux/Agents/Slice";
import { useRouter } from "next/navigation";
import { FaFileAlt } from "react-icons/fa";
import { CiTrash } from "react-icons/ci";
import { MdOutlineFileUpload } from "react-icons/md";
import { toast } from "react-toastify";

// Single Bot Page
const SingleAgent: React.FC<any> = ({ id }) => {
  let router = useRouter();
  let dispatch = useDispatch<AppDispatch>();
  const fileInputRef = useRef<any>(null);
  const { selectedAgent, deleteAgent, uploadAgentDocx } = useSelector(
    (state: any) => state.AgentsSlice,
  );
  const [singleAgentData, setSingleAgentData] = useState<any>({});

  useEffect(() => {
    let data: any = { id: id };
    dispatch(GetSingleAgentById(data));
  }, [dispatch, id]);

  //
  useEffect(() => {
    console.log("selectedAgent---", selectedAgent);
    if (selectedAgent.error === null && selectedAgent.data !== null) {
      setSingleAgentData(selectedAgent.data);
    }
  }, [selectedAgent]);

  useEffect(() => {
    if (deleteAgent.error == null && deleteAgent.isSuccess == true) {
      dispatch(RESET_DELETE_AGENT());
      router.push(`/agents/${singleAgentData.customer.id}`);
    }
  }, [deleteAgent]);

  const filterFileName = (fullName: any, filterType: any) => {
    if (fullName !== "" && fullName !== undefined && fullName !== "undefined") {
      let array = fullName.split("/");
      let fileName = null;
      if (filterType == "name") {
        let nameWithExt = array[array.length - 1];
        let newAry = nameWithExt.split(".");
        fileName = newAry[0];
      }

      if (filterType == "ext") {
        let nameWithExt = array[array.length - 1];
        let newAry = nameWithExt.split(".");
        fileName = newAry[1];
      }
      return fileName;
    }
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Open the file input dialog
    }
  };

  const handleFileChange = async (event: any) => {
    const file = event.target.files?.[0]; // Retrieve the selected file

    if (file) {
      // Check file type
      const allowedTypes = [
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (!allowedTypes.includes(file.type)) {
        toast.error("Only .docx and .pdf files are allowed.");
        return;
      }

      const formData: any = new FormData();
      formData.append("agent_id", id);
      formData.append("document", file);

      await dispatch(AgentDocumentUpload(formData));
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset the file input for future selections
    }
  };

  return (
    <div className="h-screen">
      <div className="mb-4 mt-4">
        <div className="text-2xl font-bold text-black dark:text-white">
          Agent Details
        </div>
      </div>

      <div className="rounded-md bg-white p-8 shadow-md dark:bg-gray-800">
        {/* Agent Name and Logo */}
        <div className="mb-6 flex items-center justify-between">
          <div className="mb-6 flex items-center">
            <img
              src={`${singleAgentData?.logo !== null ? `${process.env.NEXT_PUBLIC_API_URL}${singleAgentData?.logo}` : `https://img.freepik.com/free-vector/graident-ai-robot-vectorart_78370-4114.jpg?t=st=1733320935~exp=1733324535~hmac=1985180c42ca62306ae1175b91b4db0a7b7309dd4e63e0f86007e8cf18672aa5&w=826`}`}
              alt="Agent Logo"
              className="h-20 w-20 rounded-full border border-gray-300"
            />
            <div className="ml-4">
              <p className="text-lg font-semibold text-black dark:text-white">
                {singleAgentData?.name}
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                Website:
                <a
                  href={`https://${singleAgentData?.website_url}`}
                  className="text-blue-500 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {singleAgentData?.website_url}
                </a>
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <Link href="/agents/edit/23">
              <Button>Edit</Button>
            </Link>
            <Button
              onClick={async () => {
                let data: any = { id: singleAgentData?.id };
                await dispatch(DeleteAgentById(data));
              }}
            >
              Delete
              {deleteAgent?.loading == true ? (
                <>
                  <CircularProgress
                    color="inherit"
                    size={20}
                    className="ml-2"
                  />
                </>
              ) : (
                <></>
              )}
            </Button>
          </div>
        </div>

        {/* Business Information */}
        <div className="mb-6">
          <p className="text-lg font-semibold text-black dark:text-white">
            Business Information
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            {singleAgentData?.business_information}
          </p>
        </div>

        {/* Documents */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <p className="mb-4 text-lg font-semibold text-black dark:text-white">
              Business Documents
            </p>
            <Button onClick={handleUploadClick}>
              Upload
              {uploadAgentDocx?.loading == true ? (
                <>
                  <CircularProgress size={25} color="inherit" />
                </>
              ) : (
                <>
                  <MdOutlineFileUpload size={25} className="ml-2" />
                </>
              )}
            </Button>
            {uploadAgentDocx?.loading == false ? (
              <>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </>
            ) : (
              <></>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.doc,.docx"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>

          <div className="relative overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400 rtl:text-right">
              <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    File Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    File Type
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {singleAgentData?.documents?.map((doc: any, index: number) => (
                  <tr
                    key={index}
                    className="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <th
                      scope="row"
                      className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                    >
                      {filterFileName(doc.document, "name")}
                    </th>
                    <td className="px-6 py-4">
                      {filterFileName(doc.document, "ext")}
                    </td>
                    <td className="px-6 py-4">
                      <Button
                        onClick={() => {
                          let data: any = { id: doc.id };
                          // Filter out the document that matches `data.id`
                          let documents = singleAgentData.documents.filter(
                            (document: any) => document.id !== data.id,
                          );
                          // Update the local state if needed
                          setSingleAgentData((prev: any) => ({
                            ...prev,
                            documents: documents,
                          }));
                          // Dispatch the delete action
                          dispatch(DeleteAgentDocumentById(data));
                        }}
                      >
                        <CiTrash size={25} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <button className="flex w-full cursor-pointer items-center justify-center rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90">
          View History
        </button>
      </div>
    </div>
  );
};

export default SingleAgent;
