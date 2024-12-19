import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Image from "next/image";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

import Customer from "@/components/CustomerList/Customers";
export const metadata: Metadata = {
  title: "Next.js Profile | Agent MVP",
  description: "Customers list",
};

const CustomerList = () => {
  return (
    <DefaultLayout>
      <Customer />
    </DefaultLayout>
  );
};

export default CustomerList;
