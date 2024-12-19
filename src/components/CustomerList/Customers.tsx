"use client";
import React from "react";
import TableOne from "./TableOne";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { getAllCustomers } from "@/redux/Customer/Apis";
import { AppDispatch } from "@/redux/store";
import CustomModal from "@/components/Model/Custom";
import { useForm, Controller } from "react-hook-form";
import CircularProgress from "@mui/material/CircularProgress";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import {
  AddNewCustomer,
  DeleteCustomer,
  EditCustomer,
} from "@/redux/Customer/Apis";

// Use component for all customers
const CustomersList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { current_user } = useSelector((state: any) => state.Auth_States);
  const { allCustomers } = useSelector((state: any) => state.CustomerSlice);
  const [open, setOpen] = useState(false);
  const [modelTitle, setmodelTitle] = useState("");
  const [singleCustomer, setSingleCustomer] = useState<any>({});

  const schema = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password:
      modelTitle === "Add Customer"
        ? Yup.string() // Validate password for Add Customer case
            .min(8, "Password must be at least 8 characters")
            .required("Password is required")
        : Yup.string() // Skip validation for password if not Add Customer
            .notRequired(),
  });
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(schema),
  });

  // Check if role is "admin" and handle redirection in useEffect
  useEffect(() => {
    if (current_user?.data?.data?.role !== "admin") {
      router.push("/dashboard"); // Redirection after component mounts
    } else {
      dispatch(getAllCustomers()); // Dispatch action if user is admin
    }
  }, [current_user, dispatch, router]);

  useEffect(() => {
    if (singleCustomer) {
      setValue("firstName", singleCustomer?.firstName || "");
      setValue("lastName", singleCustomer?.lastName || "");
      setValue("email", singleCustomer?.email || "");
      setValue("phone_number", singleCustomer?.phone_number || "");
      if (modelTitle === "Add Customer") {
        setValue("password", singleCustomer?.password || "");
      }
    }
  }, [singleCustomer, setValue, modelTitle]); // Listen for changes in singleCustomer

  // Optionally, you can show a loading state while checking the user role or fetching data
  if (!current_user) {
    return <div>Loading...</div>; // Display loading until user data is available
  }

  const handleTableRow = async (type: any, data: any) => {
    console.log("click type--", type);
    console.log("click data--", data);
    if (type === "edit") {
      setSingleCustomer(data); // Set the customer data when editing
      setmodelTitle("Edit Customer");
      setOpen(true); // Open the modal
    }

    if (type === "add") {
      setSingleCustomer({}); // Set the customer data when editing
      setmodelTitle("Add Customer");
      setOpen(true); // Open the modal
    }

    if (type === "delete") {
      setSingleCustomer({}); // Set the customer data when editing
      await dispatch(DeleteCustomer({ id: data.id }));
    }
  };

  const onSubmit = async (data: any) => {
    console.log("Updated Customer Data:", data);

    await dispatch(AddNewCustomer(data));

    setOpen(false);
    // handle update logic
  };

  //  update the Customer
  const UpdateSubmit = async (data: any) => {
    data.id = singleCustomer.id;
    console.log("Updated Customer Data:", data);
    await dispatch(EditCustomer(data));
    setOpen(false);
    // handle update logic
  };

  console.log("allCustomers---", allCustomers);

  if (current_user?.data?.data?.role === "admin") {
    return (
      <div className="flex flex-col gap-10">
        <TableOne
          customer={allCustomers?.data?.data || []}
          action={handleTableRow}
        />

        {/* Modal for Edit and Create User */}
        <CustomModal open={open} setOpen={setOpen} title={modelTitle}>
          <form
            onSubmit={handleSubmit((data) =>
              modelTitle === "Add Customer"
                ? onSubmit(data)
                : UpdateSubmit(data),
            )}
          >
            <div className="mb-4">
              <label className="mb-2.5 block font-medium text-black dark:text-white">
                First Name
              </label>
              <div className="relative">
                <Controller
                  name="firstName"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      placeholder="First name"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  )}
                />
                {errors.firstName && (
                  <p className="text-sm text-red-500">
                    {typeof errors.firstName.message === "string"
                      ? errors.firstName.message
                      : "This field is required"}
                  </p>
                )}
              </div>
            </div>
            <div className="mb-4">
              <label className="mb-2.5 block font-medium text-black dark:text-white">
                Last Name
              </label>
              <div className="relative">
                <Controller
                  name="lastName"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      placeholder="Last name"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  )}
                />
                {errors.lastName && (
                  <p className="text-sm text-red-500">
                    {typeof errors.lastName.message === "string"
                      ? errors.lastName.message
                      : "This field is required"}
                  </p>
                )}
              </div>
            </div>
            <div className="mb-4">
              <label className="mb-2.5 block font-medium text-black dark:text-white">
                Email
              </label>
              <div className="relative">
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      placeholder="Email"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  )}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">
                    {typeof errors.email.message === "string"
                      ? errors.email.message
                      : "This field is required"}
                  </p>
                )}
              </div>
            </div>
            <div className="mb-4">
              <label className="mb-2.5 block font-medium text-black dark:text-white">
                Phone Number
              </label>
              <div className="relative">
                <Controller
                  name="phone_number"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="number"
                      placeholder="Phone number"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  )}
                />
              </div>
            </div>

            {modelTitle == "Add Customer" ? (
              <>
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    password
                  </label>
                  <div className="relative">
                    <Controller
                      name="password"
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="password"
                          placeholder="password"
                          className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                      )}
                    />
                    {errors.password && (
                      <p className="text-sm text-red-500">
                        {typeof errors.password.message === "string"
                          ? errors.password.message
                          : "This field is required"}
                      </p>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}

            <button
              type="submit"
              className="flex w-full cursor-pointer items-center justify-center rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
            >
              {modelTitle === "Add Customer" ? "Create" : "Update"}

              {allCustomers?.loading == true ? (
                <>
                  <CircularProgress
                    color="inherit"
                    size={18}
                    className="ml-2"
                  />
                </>
              ) : (
                <></>
              )}
            </button>
          </form>
        </CustomModal>
      </div>
    );
  }

  return null; // Don't render anything if it's not admin
};

export default CustomersList;
