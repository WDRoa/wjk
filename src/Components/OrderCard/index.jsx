import { useState, useContext, useEffect } from "react";
import { XMarkIcon, PlusIcon, MinusIcon } from "@heroicons/react/24/solid";
import { ShoppingCartContext } from "../../Context";

const OrderCard = ({
  id,
  title,
  imageUrl,
  price,
  handleDelete,
  productCount = 1,
  disableQuantityControls = false,
}) => {
  const context = useContext(ShoppingCartContext);
  const [count, setCount] = useState(productCount);

  useEffect(() => {
    const updatedCart = context.cartProducts.map(product =>
      product.id === id ? { ...product, count: count } : product
    );
    context.setCartProducts(updatedCart);
  }, [count]);

  const increaseProductCount = () => {
    setCount(prevCount => prevCount + 1);
  };

  const decreaseProductCount = () => {
    setCount(prevCount => (prevCount > 1 ? prevCount - 1 : 1));
  };

  let renderXMarkIcon;
  if (handleDelete) {
    renderXMarkIcon = (
      <XMarkIcon
        tabIndex={0}
        onKeyDown={event => {
          if (event.key === "Enter" || event.key === " ") {
            handleDelete(id);
          }
        }}
        onClick={() => handleDelete(id)}
        className="h-6 w-6 text-gray-700 cursor-pointer hover:text-blue-600 dark:text-gray-300"
      />
    );
  }

  return (
    <div className="flex shadow-lg justify-between items-center mb-3 pr-2 rounded-lg dark:border-gray-600 border">
      <div className="flex items-center gap-2">
        <figure className="w-20 h-20 select-none rounded-lg border dark:bg-white">
          <img
            className="w-20 h-20 min-w-20 object-contain rounded-md p-2"
            src={imageUrl}
            alt={title}
          />
        </figure>
        <div className="flex flex-col">
          <p className="text-sm font-light w-2/3 line-clamp-1">{title}</p>
          {!disableQuantityControls && (
            <div className="flex items-center gap-2 mt-1">
              <button
                onClick={decreaseProductCount}
                className="bg-gray-600 hover:bg-blue-600 py-3 text-white rounded-lg font-black w-6 h-6 flex justify-center items-center select-none"
              >
                <MinusIcon className="h-4 w-4" />
              </button>
              <span className="select-none flex items-center justify-center w-6 h-6 bg-blue-600 text-white">
                {count}
              </span>
              <button
                onClick={increaseProductCount}
                className="bg-gray-600 hover:bg-blue-600 py-3 text-white rounded-lg font-bold w-6 h-6 flex justify-center items-center select-none dark:bg-gray-600 dark:text-gray-300"
              >
                <PlusIcon className="h-4 w-4" />
              </button>
            </div>
          )}
          {disableQuantityControls && (
            <span className="text-sm font-bold">Amount: {count}</span>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <p className="text-lg font-medium select-none">
          ${(price * count).toFixed(2)}
        </p>
        {renderXMarkIcon}
      </div>
    </div>
  );
};

export default OrderCard;
