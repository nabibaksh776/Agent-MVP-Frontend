"use client";
//@ts-nocheck
import React from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
  Grid,
} from "@mui/material";
import { FaPlus, FaTrashAlt } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { useState } from "react";
import { CreateNewAgent } from "@/redux/Agents/Apis";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";

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
  products?: {
    product: string;
    price: number;
  }[]; // Optional array of products
  services?: {
    product: string;
    price: number;
  }[]; // Optional array of services

  // techniques sales
  TechNiequName: string;
  TDescription: string;
  TInformation: string;
};

//
//
// create agent component
//
//
const CreateNewBotForm: React.FC<any> = ({ id }) => {
  let dispatch = useDispatch<AppDispatch>();
  const [logoPreview, setLogoPreview] = useState<any>(null);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [SalesTechniquesFiles, setSalesTechniquesFiles] = useState<File[]>([]);
  const [AgentLogo, setAgentLogo] = useState<File>();
  const { createAgent } = useSelector((state: any) => state.AgentsSlice);

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
      products: [],
      services: [],
      // sales techniques
      TechNiequName: "",
      TDescription: "",
      TInformation: "",
    },
  });

  const {
    fields: fieldsProduct,
    append: appendProducts,
    remove: removeProducts,
  } = useFieldArray({
    control,
    name: "products",
  });
  const {
    fields: fieldsServices,
    append: appendServices,
    remove: removeServices,
  } = useFieldArray({
    control,
    name: "services",
  });

  const onSubmit = async (data: any) => {
    // Create a FormData object
    const formData: any = new FormData();

    // Append each file in the uploadedFiles array
    if (uploadedFiles && uploadedFiles.length > 0) {
      uploadedFiles.forEach((file, index) => {
        formData.append("business_docx_files", file); // "business_docx[]" is the key name for multiple files
      });
    }

    // Sales techniques files
    if (SalesTechniquesFiles && SalesTechniquesFiles.length > 0) {
      SalesTechniquesFiles.forEach((file, index) => {
        formData.append("Sales_techniques_files", file); // "business_docx[]" is the key name for multiple files
      });
    }

    // Append other fields
    formData.append("customer_id", id); // Assuming 'id' is accessible in this scope
    formData.append("name", data?.botName);
    formData.append("website_url", data?.website_url);
    formData.append("business_information", data?.business_information);
    // sales Techniques
    formData.append("TName", data?.TechNiequName);
    formData.append("TDescription", data?.TDescription);
    formData.append("Tinformation", data?.TInformation);

    // Add botLogo if present
    if (AgentLogo) {
      formData.append("logo_file", AgentLogo);
    }

    console.log("FormData Content:", formData);

    // Dispatch the FormData object
    await dispatch(CreateNewAgent(formData));

    // Reset the form values
    reset();
    setUploadedFiles([]); // Reset the uploaded files array
    setAgentLogo(undefined); // Reset the logo
    setUploadedFiles([]); // Reset the logo
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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      // Filter the valid files (.pdf or .docx)
      const validFiles = Array.from(files).filter(
        (file) =>
          file.type === "application/pdf" || file.name.endsWith(".docx"),
      );

      // If there are any valid files, append them to the state
      if (validFiles.length > 0) {
        setUploadedFiles((prevFiles) => [...prevFiles, ...validFiles]); // Append valid files to the array
      } else {
        toast.error("Only .pdf and .docx files are allowed.");
      }
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index)); // Remove file based on its index
  };

  // handleFileChangeSalesTechniques
  const handleFileChangeSalesTechniques = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      // Append any valid files to the state without type filtering
      setSalesTechniquesFiles((prevFiles) => [
        ...prevFiles,
        ...Array.from(files),
      ]);
    }
  };

  const removeFile2 = (index: number) => {
    setSalesTechniquesFiles((prevFiles) =>
      prevFiles.filter((_, i) => i !== index),
    ); // Remove file based on its index
  };

  return (
    <Box className="h-screen">
      <Box className="mb-4 mt-4">
        <Box className="text-title-md font-bold text-black dark:text-white">
          Create New Agent
        </Box>
      </Box>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Box className="rounded-md bg-white p-8 shadow-md dark:bg-boxdark">
          {/* Logo Section */}
          <Box className="mb-6">
            <Box className="mb-2 font-semibold text-black dark:text-white">
              Bot Logo
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
              {...register("botName")}
              error={!!errors.botName}
              helperText={errors.botName?.message}
              InputProps={{
                className: "text-black dark:text-white", // For input text
              }}
              InputLabelProps={{
                className: "text-black dark:text-white", // For the label text
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
              className="text-black dark:text-white"
              label="business information"
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

          {/* uplaod file */}
          <Box className="mb-6">
            <label>Business Documents</label>
            <TextField
              fullWidth
              className="text-black dark:text-white"
              label=""
              type="file"
              inputProps={{
                accept: ".pdf, .docx", // Restrict file types to .pdf and .docx
                multiple: true, // Allow multiple file selection
              }}
              onChange={handleFileChange}
              InputProps={{
                className: "text-black dark:text-white", // For input text
              }}
              InputLabelProps={{
                className: "text-black dark:text-white", // For the label text
              }}
            />
          </Box>
          {/* List Uploaded Files */}
          <Box className="mb-6">
            {uploadedFiles.length > 0 && (
              <Box>
                <p className="font-semibold text-black dark:text-white">
                  Uploaded Files:
                </p>
                <ul className="list-disc pl-5">
                  {uploadedFiles.map((file: File, index: number) => (
                    <li key={index} className="text-black dark:text-white">
                      {file.name}
                      <IconButton
                        onClick={() => removeFile(index)} // Function to remove a specific file
                        className="ml-2 text-black dark:text-white"
                      >
                        <RxCross2 size={20} />
                      </IconButton>
                    </li>
                  ))}
                </ul>
              </Box>
            )}
          </Box>

          {/* Submit Button */}
        </Box>

        {/* Sales Techniques Section */}
        <div className="mt-4 rounded-md bg-white p-8 shadow-md dark:bg-boxdark">
          <div className="text-md mb-2 font-semibold text-black dark:text-white">
            Add Sales Technique
          </div>

          <div className="mb-6">
            <label>Name</label>
            <TextField
              fullWidth
              className="text-black dark:text-white"
              {...register("TechNiequName")}
              error={!!errors.TechNiequName}
              helperText={errors.TechNiequName?.message}
              InputProps={{
                className: "text-black dark:text-white", // For input text
              }}
              InputLabelProps={{
                className: "text-black dark:text-white", // For the label text
              }}
            />
          </div>
          <div className="mb-6">
            <label>Description</label>
            <TextField
              fullWidth
              className="text-black dark:text-white"
              {...register("TDescription")}
              error={!!errors.TDescription}
              helperText={errors.TDescription?.message}
              InputProps={{
                className: "text-black dark:text-white", // For input text
              }}
              InputLabelProps={{
                className: "text-black dark:text-white", // For the label text
              }}
            />
          </div>
          <div className="mb-6">
            <label>Information</label>
            <TextField
              fullWidth
              className="text-black dark:text-white"
              label="Information"
              {...register("TInformation")}
              error={!!errors.TInformation}
              helperText={errors.TInformation?.message}
              InputProps={{
                className: "text-black dark:text-white", // For input text
              }}
              InputLabelProps={{
                className: "text-black dark:text-white", // For the label text
              }}
            />
          </div>

          <Box className="mb-6">
            <label>Upload Document</label>
            <TextField
              fullWidth
              className="text-black dark:text-white"
              label=""
              type="file"
              inputProps={{
                multiple: true, // Allow multiple file selection
              }}
              onChange={handleFileChangeSalesTechniques}
              InputProps={{
                className: "text-black dark:text-white", // For input text
              }}
              InputLabelProps={{
                className: "text-black dark:text-white", // For the label text
              }}
            />
          </Box>

          <Box className="mb-6">
            {SalesTechniquesFiles.length > 0 && (
              <Box>
                <p className="font-semibold text-black dark:text-white">
                  Uploaded Files:
                </p>
                <ul className="list-disc pl-5">
                  {SalesTechniquesFiles.map((file: File, index: number) => (
                    <li key={index} className="text-black dark:text-white">
                      {file.name}
                      <IconButton
                        onClick={() => removeFile2(index)} // Function to remove a specific file
                        className="ml-2 text-black dark:text-white"
                      >
                        <RxCross2 size={20} />
                      </IconButton>
                    </li>
                  ))}
                </ul>
              </Box>
            )}
          </Box>
        </div>

        <div className="mt-4 rounded-md bg-white p-8 shadow-md dark:bg-boxdark">
          {/* Products Section */}
          <Box className="text-md mb-2 font-semibold text-black dark:text-white">
            Add Products
          </Box>

          {fieldsProduct.map((field, index) => (
            <Grid
              container
              spacing={2}
              alignItems="center"
              key={field.id}
              className="mb-4"
            >
              <Grid item xs={5}>
                <Controller
                  name={`products.${index}.product`}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      label="Product"
                      {...field}
                      error={!!errors.products?.[index]?.product}
                      helperText={errors.products?.[index]?.product?.message}
                      InputProps={{
                        className: "text-black dark:text-white", // For input text
                      }}
                      InputLabelProps={{
                        className: "text-black dark:text-white", // For the label text
                      }}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={5}>
                <Controller
                  name={`products.${index}.price`}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      label="Price"
                      {...field}
                      type="number"
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value) || 0)
                      }
                      error={!!errors.products?.[index]?.price}
                      helperText={errors.products?.[index]?.price?.message}
                      InputProps={{
                        className: "text-black dark:text-white", // For input text
                      }}
                      InputLabelProps={{
                        className: "text-black dark:text-white", // For the label text
                      }}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={2}>
                <div className="flex items-center justify-center">
                  <IconButton
                    onClick={() => removeProducts(index)}
                    className="text-black dark:text-white"
                  >
                    <RxCross2 size={20} />
                  </IconButton>
                </div>
              </Grid>
            </Grid>
          ))}

          {/* Add Product Button */}
          <Button
            variant="outlined"
            color="primary"
            className="mt-4 flex items-center"
            onClick={() => appendProducts({ product: "", price: 0 })}
          >
            <FaPlus className="mr-3" /> Add Product
          </Button>

          <Box className="text-md mb-2 mt-6 font-semibold text-black dark:text-white">
            Add Services
          </Box>
          {fieldsServices.map((field, index) => (
            <Grid
              container
              spacing={2}
              alignItems="center"
              key={field.id}
              className="mb-4"
            >
              <Grid item xs={5}>
                <Controller
                  name={`services.${index}.product`}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      label="Product"
                      {...field}
                      error={!!errors.services?.[index]?.product}
                      helperText={errors.services?.[index]?.product?.message}
                      InputProps={{
                        className: "text-black dark:text-white", // For input text
                      }}
                      InputLabelProps={{
                        className: "text-black dark:text-white", // For the label text
                      }}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={5}>
                <Controller
                  name={`services.${index}.price`}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      label="Price"
                      {...field}
                      type="number"
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value) || 0)
                      }
                      error={!!errors.services?.[index]?.price}
                      helperText={errors.services?.[index]?.price?.message}
                      InputProps={{
                        className: "text-black dark:text-white", // For input text
                      }}
                      InputLabelProps={{
                        className: "text-black dark:text-white", // For the label text
                      }}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={2}>
                <div className="flex items-center justify-center">
                  <IconButton
                    onClick={() => removeServices(index)}
                    className="text-black dark:text-white"
                  >
                    <RxCross2 size={20} />
                  </IconButton>
                </div>
              </Grid>
            </Grid>
          ))}

          <Button
            variant="outlined"
            color="primary"
            className="mt-4 flex items-center"
            onClick={() => appendServices({ product: "", price: 0 })}
          >
            <FaPlus className="mr-3" /> Add Services
          </Button>

          <div className="mt-4 flex items-center justify-end text-right">
            <button
              className="flex w-[200px] cursor-pointer items-center justify-center rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
              type="submit"
            >
              Create
              {createAgent?.loading == true ? (
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
        </div>
      </form>
    </Box>
  );
};

export default CreateNewBotForm;
