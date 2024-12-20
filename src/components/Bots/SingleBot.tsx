"use client";
import React, { useState, useEffect, useRef } from "react";
import { Button } from "@mui/material";
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
import { RESET_DELETE_AGENT, HandleAgentDocuments } from "@/redux/Agents/Slice";
import { HandleSalesTechniqueDocuments } from "@/redux/SalesTechniques/Slice";
import { useRouter } from "next/navigation";
import { CiTrash } from "react-icons/ci";
import { MdOutlineFileUpload } from "react-icons/md";
import { toast } from "react-toastify";
import CustomModal from "../Model/Custom";
import { useForm, Controller } from "react-hook-form";
import { IoIosArrowBack } from "react-icons/io";
import { MdDownload } from "react-icons/md";
// apis call
import {
  GetSalesTechniquesByAgentID,
  UpdateSalesTechnique,
  UploadSalesTechniqueDocumentsByID,
  DeleteSalesTechniqueDocumentById,
} from "@/redux/SalesTechniques/Apis";
// Single Bot Page
const SingleAgent: React.FC<any> = ({ id }) => {
  let router = useRouter();
  let dispatch = useDispatch<AppDispatch>();
  const fileInputRef = useRef<any>(null);
  const fileInputRef2 = useRef<any>(null);
  const [open, setOpen] = useState(false);
  const [modelTitle, setmodelTitle] = useState("");

  const { current_user } = useSelector((state: any) => state.Auth_States);

  const { selectedAgent, deleteAgent, uploadAgentDocx } = useSelector(
    (state: any) => state.AgentsSlice,
  );
  // sales techniques state
  const { salesTechnique, uploadSalesDocx } = useSelector(
    (state: any) => state.SalesTechniqueSlice,
  );
  const [singleAgentData, setSingleAgentData] = useState<any>({});

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<any>();

  useEffect(() => {
    if (salesTechnique?.data !== null) {
      setValue("name", salesTechnique?.data?.data?.name || "");
      setValue("BDescription", salesTechnique?.data?.data?.description || "");
      setValue("BInformation", salesTechnique?.data?.data?.information || "");
      setValue("status", salesTechnique?.data?.data?.status || "");
    }
  }, [salesTechnique, setValue]);

  useEffect(() => {
    let data: any = { id: id };
    dispatch(GetSingleAgentById(data));
    dispatch(GetSalesTechniquesByAgentID(data));
  }, [dispatch, id]);

  //
  useEffect(() => {
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

  // handleFileChangeSalesTechique

  const handleUploadClickSalesTechnique = () => {
    if (fileInputRef2.current) {
      fileInputRef2.current.click(); // Open the file input dialog
    }
  };
  const handleFileChangeSalesTechique = async (event: any) => {
    const file = event.target.files?.[0]; // Retrieve the selected file

    if (file) {
      // Check file type

      const formData: any = new FormData();
      formData.append("sales_tech_id", salesTechnique.data?.data?.id);
      formData.append("document", file);

      await dispatch(UploadSalesTechniqueDocumentsByID(formData));
    }

    if (fileInputRef2.current) {
      fileInputRef2.current.value = ""; // Reset the file input for future selections
    }
  };

  // submit edit sales technique
  const onSubmit = async (data: any) => {
    let dataObj: any = {
      id: salesTechnique?.data?.data?.id || "",
      name: data.name,
      description: data.BDescription,
      information: data.BInformation,
      status: data.status,
    };

    await dispatch(UpdateSalesTechnique(dataObj));
  };

  console.log("selectedAgent---", selectedAgent);

  return (
    <div className="h-[100%]">
      <div className="mb-4 mt-4 flex items-center justify-start">
        <Link href={`/agents/${selectedAgent?.data?.customer?.id}`}>
          <Button>
            <IoIosArrowBack color="inherit" size={25} />
          </Button>
        </Link>
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
            <Link href={`/agents/history/${singleAgentData?.id}`}>
              <Button>Chat History</Button>
            </Link>
            {current_user?.data?.data.role == "admin" ? (
              <>
                <Link href={`/agents/edit/${singleAgentData?.id}`}>
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
              </>
            ) : (
              <></>
            )}
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

            {current_user?.data?.data.role == "admin" ? (
              <>
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
                      {/* IoEyeOutline */}

                      {current_user?.data?.data.role == "admin" ? (
                        <>
                          <Button
                            onClick={() => {
                              let data: any = { id: doc.id };
                              // Filter out the document that matches `data.id`
                              dispatch(
                                HandleAgentDocuments({
                                  type: "remove",
                                  id: doc.id,
                                }),
                              );
                              // Dispatch the delete action
                              dispatch(DeleteAgentDocumentById(data));
                            }}
                          >
                            <CiTrash size={25} />
                          </Button>
                        </>
                      ) : (
                        <>
                          <a
                            href={`${process.env.NEXT_PUBLIC_API_URL}${doc?.document}`}
                            target="_blank"
                          >
                            <Button>
                              <MdDownload size={25} />
                            </Button>
                          </a>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* sales technique section */}
      {salesTechnique.data !== null ? (
        <>
          <div className="mt-4 rounded-md bg-white p-8 shadow-md dark:bg-gray-800">
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <p className="mb-4 text-lg font-semibold text-black dark:text-white">
                  Sales Techniques
                </p>

                {current_user?.data?.data.role == "admin" ? (
                  <>
                    <Button
                      onClick={() => {
                        setmodelTitle("Edit Sales Techniques");
                        setOpen(true);
                      }}
                    >
                      Edit
                    </Button>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
            {salesTechnique?.data !== null ? (
              <>
                <div className="mb-6">
                  <p className="text-lg font-semibold text-black dark:text-white">
                    Sales Technique Name
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    {salesTechnique?.data?.data?.name}
                  </p>
                </div>
                <div className="mb-6">
                  <p className="text-lg font-semibold text-black dark:text-white">
                    Business Description
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    {salesTechnique?.data?.data?.description}
                  </p>
                </div>
                <div className="mb-6">
                  <p className="text-lg font-semibold text-black dark:text-white">
                    Business Information
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    {salesTechnique?.data?.data?.information}
                  </p>
                </div>

                <div className="mb-6">
                  <p className="text-lg font-semibold text-black dark:text-white">
                    Status
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    {salesTechnique?.data?.data?.status}
                  </p>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between">
                    <p className=" text-lg font-semibold text-black dark:text-white">
                      Documents
                    </p>

                    {current_user?.data?.data.role == "admin" ? (
                      <>
                        <Button onClick={handleUploadClickSalesTechnique}>
                          Upload
                          {uploadSalesDocx?.loading == true ? (
                            <>
                              <CircularProgress size={25} color="inherit" />
                            </>
                          ) : (
                            <>
                              <MdOutlineFileUpload size={25} className="ml-2" />
                            </>
                          )}
                        </Button>

                        {/* file upload for sales technique */}
                        <input
                          ref={fileInputRef2}
                          type="file"
                          className="hidden"
                          onChange={handleFileChangeSalesTechique}
                        />
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
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
                      {salesTechnique?.data?.data?.documents?.map(
                        (doc: any, index: number) => (
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
                              {current_user?.data?.data.role == "admin" ? (
                                <>
                                  <Button
                                    onClick={async () => {
                                      let data: any = { id: doc.id };

                                      // remove from state
                                      await dispatch(
                                        HandleSalesTechniqueDocuments({
                                          type: "remove",
                                          id: doc.id,
                                        }),
                                      );
                                      // remove from api
                                      await dispatch(
                                        DeleteSalesTechniqueDocumentById(data),
                                      );
                                    }}
                                  >
                                    <CiTrash size={25} />
                                  </Button>
                                </>
                              ) : (
                                <>
                                  <a
                                    href={`${process.env.NEXT_PUBLIC_API_URL}${doc?.document}`}
                                    target="_blank"
                                  >
                                    <Button>
                                      <MdDownload size={25} />
                                    </Button>
                                  </a>
                                </>
                              )}
                            </td>
                          </tr>
                        ),
                      )}
                    </tbody>
                  </table>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
        </>
      ) : (
        <></>
      )}

      {/* Model */}
      <CustomModal open={open} setOpen={setOpen} title={modelTitle}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6">
            <label className="mb-2.5 block font-medium text-black dark:text-white">
              Name
            </label>
            <div className="relative">
              <Controller
                defaultValue=""
                name="name"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    placeholder="Name"
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                )}
              />
            </div>
          </div>
          <div className="mb-6">
            <label className="mb-2.5 block font-medium text-black dark:text-white">
              Business Description
            </label>
            <div className="relative">
              <Controller
                defaultValue=""
                name="BDescription"
                control={control}
                render={({ field }) => (
                  <textarea
                    {...field}
                    placeholder="Business Information"
                    rows={4} // Set default number of rows
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    style={{ minHeight: "100px", resize: "none" }} // Optional inline style for minimum height
                  />
                )}
              />
            </div>
          </div>
          <div className="mb-6">
            <label className="mb-2.5 block font-medium text-black dark:text-white">
              Business Information
            </label>
            <div className="relative">
              <Controller
                defaultValue=""
                name="BInformation"
                control={control}
                render={({ field }) => (
                  <textarea
                    {...field}
                    placeholder="Business Information"
                    rows={4} // Set default number of rows
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    style={{ minHeight: "100px", resize: "none" }} // Optional inline style for minimum height
                  />
                )}
              />
            </div>
          </div>
          <div className="mb-6">
            <label className="mb-2.5 block font-medium text-black dark:text-white">
              Status
            </label>
            <div className="relative">
              <Controller
                defaultValue=""
                name="status"
                control={control}
                render={({ field }) => (
                  <select
                    {...field}
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  >
                    <option value={"disabled"}>Disable</option>
                    <option value={"enabled"}>Enable</option>
                  </select>
                )}
              />
            </div>
          </div>

          <div className="mb-5">
            <button
              type="submit"
              className="flex w-full cursor-pointer items-center justify-center rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
            >
              Save
            </button>
          </div>
        </form>
      </CustomModal>
    </div>
  );
};

export default SingleAgent;
