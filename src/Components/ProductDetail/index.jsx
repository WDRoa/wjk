import { useContext } from 'react';
import { XMarkIcon, PlusIcon, CheckIcon } from '@heroicons/react/24/solid';
import { ShoppingCartContext } from '../../Context';
import './styles.css';

const ProductDetail = () => {
  const context = useContext(ShoppingCartContext);

  const addProductToCartFromDetail = () => {
    const isInCart = context.cartProducts.some(product => product.id === context.productToShow.id);
    
    if (!isInCart) {
      context.setCount(context.count + 1);
      context.setCartProducts([...context.cartProducts, context.productToShow]);
    }
    
    
  };

  const removeProductFromCartFromDetail = () => {
    context.removeProductFromCart(context.productToShow.id);
    
  };

  const isInCart = context.cartProducts.some(product => product.id === context.productToShow.id);

  return (
    <aside
      className={`${context.isProductDetailOpen ? 'product-detail-open' : 'product-detail-closed'} product-detail flex-col fixed right-1 border border-black rounded-lg bg-white z-20 dark:bg-black dark:border-white dark:text-gray-300`}>
      <div className='flex justify-between items-center p-6'>
        <h2 className='font-medium text-xl select-none dark:text-gray-300'>Detail</h2>
        <XMarkIcon
          className='h-7 w-7 bg-gray-600 rounded-2xl text-white cursor-pointer hover:text-blue-600 dark:bg-gray-700 dark:text-gray-300'
          onClick={() => context.closeProductDetail()}
        />
      </div>
      <div className='flex flex-col overflow-y-auto p-4'>
        <figure className='select-none p-4 bg-white rounded-lg'>
          <img
            className='w-full h-full '
            src={context.productToShow.image}
            alt={context.productToShow.title} />
        </figure>
        <div className='flex flex-col'>
          <span className='font-medium text-2xl mb-2 select-none'>${context.productToShow.price}</span>
          <span className='font-medium text-md mb-2'>{context.productToShow.title}</span>
          <span className='font-light text-sm'>{context.productToShow.description}</span>
        </div>
        <div className='mt-5 flex justify-center'>
          {isInCart ? (
            <button
              className='bg-gray-600 py-1 text-green-600 w-full rounded-lg select-none hover:text-gray-300 font-bold text-lg dark:bg-gray-800 dark:text-green-600'
              onClick={removeProductFromCartFromDetail}>
              <CheckIcon className='h-6 w-6 inline-block mr-2' /> Already in Cart
            </button>
          ) : (
            <button
              className='bg-gray-600 py-1 text-white w-full rounded-lg select-none hover:text-green-600 font-bold text-lg dark:bg-gray-700 dark:text-gray-300'
              onClick={addProductToCartFromDetail}>
              <PlusIcon className='h-6 w-6 inline-block mr-2' />Add to Cart
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};

export default ProductDetail;
