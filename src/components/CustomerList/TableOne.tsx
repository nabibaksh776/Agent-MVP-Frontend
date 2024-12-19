import { CiEdit } from "react-icons/ci";
import { CiTrash } from "react-icons/ci";
import Link from "next/link";

const TableOne: React.FC<{ customer: any; action: any }> = ({
  customer,
  action,
}) => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="flex items-center justify-between">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Customers
        </h4>
        <button
          onClick={() => {
            action("add", null);
          }}
          className="inline-flex items-center justify-center bg-primary px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          Add Customer
        </button>
      </div>

      <div className="mt-4 flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Full Name
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Email
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Phone
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Action
            </h5>
          </div>
        </div>

        {customer
          ?.slice() // Create a shallow copy of the array
          .reverse() // Reverse the copy
          ?.map((brand: any, key: number) => (
            <div
              className={`grid grid-cols-3 sm:grid-cols-5 ${
                key === customer.length - 1
                  ? ""
                  : "border-b border-stroke dark:border-strokedark"
              }`}
              key={key}
            >
              <div className="flex items-center gap-3 p-2.5 xl:p-5">
                {/* <div className="flex-shrink-0">
                <Image src={brand.logo} alt="Brand" width={48} height={48} />
              </div> */}
                <Link
                  href={`/agents/${brand.id}`}
                  className="hidden text-primary sm:block"
                >
                  {`${brand.firstName} ${brand.lastName}`}
                </Link>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-black dark:text-white">{brand.email}</p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-meta-3">
                  {brand.phone_number ? brand.phone_number : "-"}
                </p>
              </div>
              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <div className="flex items-center space-x-3.5">
                  <button
                    onClick={() => {
                      action("delete", brand);
                    }}
                    className="hover:text-primary"
                  >
                    <CiTrash />
                  </button>
                  <button
                    onClick={() => {
                      action("edit", brand);
                    }}
                    className="hover:text-primary"
                  >
                    <CiEdit />
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TableOne;
