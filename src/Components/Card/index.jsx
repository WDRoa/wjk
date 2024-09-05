import { useContext } from "react";
import { PlusIcon, CheckIcon } from "@heroicons/react/24/solid";
import { ShoppingCartContext } from "../../Context";

const Card = data => {
  const context = useContext(ShoppingCartContext);

  const showProduct = productDetail => {
    context.openProductDetail();
    context.setProductToShow(productDetail);
  };

  const addProductsToCart = (event, productData) => {
    event.stopPropagation();
    context.setCartProducts([...context.cartProducts, productData]);
  };

  const removeProductsFromCart = (event, productId) => {
    event.stopPropagation();
    context.removeProductFromCart(productId);
  };

  const renderIcon = id => {
    const isInCart = context.cartProducts.some(product => product.id === id);

    if (isInCart) {
      return (
        <div
          className="absolute top-0 right-0 flex justify-center items-center bg-gray-600 w-7 h-7 rounded-full m-2 p-1"
          onClick={event => removeProductsFromCart(event, id)}
          tabIndex={0}
          onKeyDown={event => {
            if (event.key === "Enter" || event.key === " ") {
              removeProductsFromCart(event, id);
            }
          }}
        >
          <CheckIcon className="h-6 w-6 text-green-500 hover:text-white" />
        </div>
      );
    } else {
      return (
        <div
          className="absolute top-0 right-0 flex justify-center items-center bg-gray-600 w-7 h-7 rounded-full m-2 p-1"
          onClick={event => addProductsToCart(event, data.data)}
          tabIndex={0}
          onKeyDown={event => {
            if (event.key === "Enter" || event.key === " ") {
              addProductsToCart(event, data.data);
            }
          }}
        >
          <PlusIcon className="text-white hover:text-green-500" />
        </div>
      );
    }
  };

  return (
    <div
      className="bg-white cursor-pointer w-56 h-60 rounded-lg p-2 hover:border-black border shadow-xl mx-4 mb-7 z-10 dark:bg-gray-800 dark:hover:border-white dark:border-black"
      onClick={() => showProduct(data.data)}
      tabIndex={0}
      onKeyDown={event => {
        if (event.key === "Enter" || event.key === " ") {
          showProduct(data.data);
        }
      }}
    >
      <figure className="relative mb-2 w-full h-4/5 dark:bg-white p-3 rounded-lg select-none border">
        <span className="absolute bottom-0 left-0 bg-white/60 rounded-lg text-black text-xs m-2 px-3 py-0.5">
          {data.data.category}
        </span>
        <img
          loading="lazy"
          className="w-full h-full object-contain rounded-lg"
          src={data.data.image}
          alt={data.data.title}
        />
        {renderIcon(data.data.id)}
      </figure>
      <p className="flex justify-around items-center dark:text-gray-300">
        <span className="text-sm font-light truncate">{data.data.title}</span>
        <span className="text-lg font-medium select-none ml-2">${data.data.price}</span>
      </p>
    </div>
  );
};

export default Card;
