import { useContext } from "react";
import { Link } from "react-router-dom";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { ShoppingCartContext } from "../../Context";
import Layout from "../../Components/Layout";
import OrderCard from "../../Components/OrderCard";
import { totalPrice } from "../../utils/index";

const MyOrder = () => {
  const context = useContext(ShoppingCartContext);
  const currentPath = window.location.pathname;
  let index = currentPath.substring(currentPath.lastIndexOf("/") + 1);
  if (index === "last") index = context.order?.length - 1;

  const order = context.order?.[index];

  const formatDate = date => {
    const options = {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: false,
    };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  return (
    <Layout>
      <div className="flex items-center justify-center relative w-96 mb-6">
        <Link to="/my-orders" className="absolute left-0">
          <ChevronLeftIcon className="h-6 w-6 text-black cursor-pointer dark:text-gray-300 ml-8 sm:ml-0" />
        </Link>
        <h1 className="font-medium text-xl dark:text-gray-300">My Order</h1>
      </div>
      {order && (
        <div className="flex justify-between items-center w-80 md:w-96 mt-6 px-6 dark:text-gray-300">
          <span className="font-bold text-md pl-3">Order Date:</span>
          <span className="text-md">{formatDate(order.date)}</span>
        </div>
      )}
      <div className="flex flex-col w-80 md:w-96 dark:text-gray-300">
        {order?.products.map(product => (
          <OrderCard
            key={product.id}
            id={product.id}
            title={product.title}
            imageUrl={product.image}
            price={product.price}
            productCount={product.count}
            disableQuantityControls={true}
          />
        ))}
      </div>
      <div className="flex justify-between items-center w-80 md:w-96 mt-3 px-6 mb-6 dark:text-gray-300">
        <span className="font-bold text-xl pl-3">Total:</span>
        <span className="font-medium text-2xl bg-slate-200 dark:bg-gray-900 p-1 rounded right-0">
          ${totalPrice(order?.products)}
        </span>
      </div>
    </Layout>
  );
};

export default MyOrder;
