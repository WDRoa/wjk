import { ChevronRightIcon } from "@heroicons/react/24/solid";

const OrdersCard = ({ date, totalPrice, totalProducts }) => {
  const formattedDate = date
    ? new Date(date).toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : new Date().toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });

  return (
    <div className="flex justify-between items-center mb-3 border border-black rounded-lg p-4 w-80 dark:text-gray-300 dark:border-gray-300">
      <div className="flex justify-between w-full">
        <p className="flex flex-col">
          <span className="font-medium">{formattedDate}</span>
          <span className="font-light">{totalProducts} articles</span>
        </p>
        <p className="flex items-center gap-2">
          <span className="font-medium text-2xl">${totalPrice}</span>
          <ChevronRightIcon className="h-6 w-6 text-black cursor-pointer dark:text-gray-300" />
        </p>
      </div>
    </div>
  );
};

export default OrdersCard;
