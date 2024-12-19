"use client";
//@ts-nocheck
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Box, TextField, Typography, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { IoIosArrowBack } from "react-icons/io";
import CircularProgress from "@mui/material/CircularProgress";
import { GetSingleAgentById } from "@/redux/Agents/Apis";
import Link from "next/link";
import { UpdateAgent } from "@/redux/Agents/Apis";


// Validation Schema
const validationSchema = yup.object().shape({
  botName: yup.string().required("Bot Name is required"),
  website_url: yup.string().required("Website URL is required"),
  business_information: yup
    .string()
    .required("Business Information is required"),
  products: yup.array().of(
    yup.object().shape({
      product: yup.string().required("Product name is required"),
      price: yup
        .number()
        .typeError("Price must be a number")
        .positive("Price must be greater than zero")
        .required("Price is required"),
    }),
  ),
  services: yup.array().of(
    yup.object().shape({
      product: yup.string().required("Service name is required"),
      price: yup
        .number()
        .typeError("Price must be a number")
        .positive("Price must be greater than zero")
        .required("Price is required"),
    }),
  ),
});

type FormValues = {
  botName: string;
  website_url: string;
  business_information: string;
};

//
//
// create agent component
//
//
const EditAgent: React.FC<any> = ({ id }) => {
  let dispatch = useDispatch<AppDispatch>();
  const { selectedAgent, updateAgent } = useSelector(
    (state: any) => state.AgentsSlice,
  );
  const [singleAgentData, setSingleAgentData] = useState<any>({});
  const [logoPreview, setLogoPreview] = useState<any>();
  const [AgentLogo, setAgentLogo] = useState<File>();
  const { createAgent } = useSelector((state: any) => state.AgentsSlice);

  useEffect(() => {
    let data: any = { id: id };
    dispatch(GetSingleAgentById(data));
  }, [dispatch, id]);

  //


  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<FormValues>({
    resolver: yupResolver<any>(validationSchema),
    defaultValues: {
      botName: "",
      website_url: "",
      business_information: "",
    },
  });

  useEffect(() => {
    if (selectedAgent.error === null && selectedAgent.data !== null) {
      setSingleAgentData(selectedAgent.data);
      setLogoPreview(
        `${process.env.NEXT_PUBLIC_API_URL}${selectedAgent.data?.logo}`,
      );

      setValue("botName", selectedAgent.data?.name);
      setValue("website_url", selectedAgent.data?.website_url);
      setValue(
        "business_information",
        selectedAgent.data?.business_information,
      );
    }
  }, [selectedAgent]);

  const onSubmit = async (data: any) => {
    // Create a FormData object
    const formData: any = new FormData();
    formData.append("name", data?.botName);
    formData.append("website_url", data?.website_url);
    formData.append("business_information", data?.business_information);
    formData.append("agent_id", singleAgentData?.id);
    // sales Techniques

    // Add botLogo if present
    if (AgentLogo) {
      formData.append("logo_file", AgentLogo);
    }

    console.log("FormData Content:", formData);

    // Dispatch the FormData object
    await dispatch(UpdateAgent(formData));
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAgentLogo(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        // Set the image preview in the state
        setLogoPreview(reader.result as string);
      };

      // Read the file as a DataURL (base64)
      reader.readAsDataURL(file);

      console.log("Selected file: ", file);
    }
  };

  return (
    <Box className="h-screen">
      <Box className="mb-4 mt-4 flex items-center justify-start">
        <div>
          <Link href={`/agents/view/${singleAgentData?.id}/`}>
            <Button>
              <IoIosArrowBack color="inherit" size={25} />
            </Button>
          </Link>
        </div>
        <Box className="text-title-md font-bold text-black dark:text-white">
          Edit Agent
        </Box>
      </Box>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Box className="rounded-md bg-white p-8 shadow-md dark:bg-boxdark">
          {/* Logo Section */}
          <Box className="mb-6">
            <Box className="mb-2 font-semibold text-black dark:text-white">
              Agent Logo
            </Box>
            <Box
              component="label"
              htmlFor="logo-upload"
              className="flex h-[100px] w-[100px] cursor-pointer items-center justify-center border border-dashed border-gray-400"
            >
              {logoPreview ? (
                <img
                  src={logoPreview}
                  alt="Bot Logo"
                  className="h-full w-full object-cover"
                />
              ) : (
                <Typography className="text-center text-sm text-gray-600 dark:text-white">
                  Logo
                </Typography>
              )}
            </Box>
            <input
              id="logo-upload"
              type="file"
              accept="image/*"
              onChange={handleLogoChange}
              className="hidden"
            />
          </Box>

          {/* Bot Name */}
          <Box className="mb-6">
            <label>Agent Name</label>
            <TextField
              fullWidth
              className="text-black dark:text-white"
              {...register("botName")} // Registered with React Hook Form
              error={!!errors.botName}
              helperText={errors.botName?.message}
              InputProps={{
                className: "text-black dark:text-white",
              }}
              InputLabelProps={{
                className: "text-black dark:text-white",
              }}
            />
          </Box>
          <Box className="mb-6">
            <label>Website Url</label>
            <TextField
              fullWidth
              className="text-black dark:text-white"
              {...register("website_url")}
              error={!!errors.website_url}
              helperText={errors.website_url?.message}
              InputProps={{
                className: "text-black dark:text-white", // For input text
              }}
              InputLabelProps={{
                className: "text-black dark:text-white", // For the label text
              }}
            />
          </Box>

          <Box className="mb-6">
            <label>Business Information</label>
            <TextField
              fullWidth
              multiline // Enables the textarea
              rows={4} // Set the number of visible rows
              className="text-black dark:text-white"
              {...register("business_information")}
              error={!!errors.business_information}
              helperText={errors.business_information?.message}
              InputProps={{
                className: "text-black dark:text-white", // For input text
              }}
              InputLabelProps={{
                className: "text-black dark:text-white", // For the label text
              }}
            />
          </Box>

          {/* Submit Button */}

          <div className="mt-4 flex items-center justify-end text-right">
            <button
              className="flex w-[200px] cursor-pointer items-center justify-center rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
              type="submit"
            >
              Update
              {updateAgent?.loading == true ? (
                <>
                  <CircularProgress
                    color="inherit"
                    size={16}
                    className="ml-2"
                  />
                </>
              ) : (
                <></>
              )}
            </button>
          </div>
        </Box>
      </form>
    </Box>
  );
};

export default EditAgent;
