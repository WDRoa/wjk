import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { ShoppingCartContext } from "../../Context";
import OrderCard from "../../Components/OrderCard";
import { totalPrice } from "../../utils/index";
import "./styles.css";

const CheckoutSideMenu = () => {
  const context = useContext(ShoppingCartContext);
  const navigate = useNavigate();

  const handleDelete = id => {
    const filteredProducts = context.cartProducts.filter(product => product.id !== id);
    context.setCartProducts(filteredProducts);
  };

  const handleCheckout = () => {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });

    const orderToAdd = {
      date: currentDate,
      formattedDate,
      products: context.cartProducts,
      totalProducts: context.cartProducts.length,
      totalPrice: totalPrice(context.cartProducts),
    };

    if (context.cartProducts.length > 0) {
      context.setOrder([...context.order, orderToAdd]);
    }
    context.setCartProducts([]);
    context.setSearchByTitle(null);
    context.closeCheckoutSideMenu();
    navigate("/my-orders/last");
  };

  return (
    <aside
      className={`checkout-side-menu fixed right-1 border border-black rounded-lg bg-white 
        ${context.isCheckoutSideMenuOpen ? "checkout-side-menu-open" : "checkout-side-menu-closed"} 
        z-20 dark:border-white dark:bg-black dark:text-gray-300`}
    >
      <div className="checkout-side-menu-header flex justify-between items-center">
        <h2 className="font-medium text-xl select-none">My Order</h2>
        <XMarkIcon
          className="h-7 w-7 bg-gray-600 rounded-2xl text-white cursor-pointer hover:text-blue-600 dark:bg-gray-600 dark:text-gray-300"
          onClick={() => context.closeCheckoutSideMenu()}
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              context.closeCheckoutSideMenu();
            }
          }}
        />
      </div>
      <div className="checkout-side-menu-content">
        {context.cartProducts.length === 0  ? (<div className="flex items-center justify-center h-5/6">
                                                <p className="select-none text-gray-500">Add products to shopping cart</p>
                                               </div>) 

                                            : (context.cartProducts.map(product => (
                                                <OrderCard
                                                  key={product.id}
                                                  id={product.id}
                                                  title={product.title}
                                                  imageUrl={product.image}
                                                  price={product.price}
                                                  handleDelete={handleDelete}
                                                />))
                                              )
        }
      </div>
      {context.cartProducts.length > 0 && (
        <div className="checkout-side-menu-footer">
          <p className="flex justify-between items-center mb-2">
            <span className="font-bold select-none">Total:</span>
            <span className="font-medium text-2xl select-none">
              ${totalPrice(context.cartProducts)}
            </span>
          </p>
          <Link
            to="/my-orders/last"
            onKeyDown={event => {
              if (event.key === "Enter" || event.key === " ") {
                handleCheckout();
              }
            }}
          >
            <button
              className="bg-gray-600 py-1 text-white w-full rounded-lg select-none hover:text-green-600 font-bold text-lg dark:bg-gray-700 dark:text-gray-300"
              onClick={handleCheckout}
            >
              Checkout
            </button>
          </Link>
        </div>
      )}
    </aside>
  );
};

export default CheckoutSideMenu;
