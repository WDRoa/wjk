import { useContext } from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';
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
    
    context.closeProductDetail();
  };

  return (
    <aside
      className={`${context.isProductDetailOpen ? 'product-detail-open' : 'product-detail-closed'} product-detail flex-col fixed right-1 border border-black rounded-lg bg-white`}>
      <div className='flex justify-between items-center p-6'>
        <h2 className='font-medium text-xl select-none'>Detail</h2>
        <XMarkIcon
          className='h-6 w-6 text-black cursor-pointer hover:text-blue-600'
          onClick={() => context.closeProductDetail()}
        />
      </div>
      <div className='flex flex-col overflow-y-auto p-4'>
        <figure className='select-none'>
          <img
            className='w-full h-full rounded-lg'
            src={context.productToShow.image}
            alt={context.productToShow.title} />
        </figure>
        <div className='flex flex-col'>
          <span className='font-medium text-2xl mb-2 select-none'>${context.productToShow.price}</span>
          <span className='font-medium text-md mb-2'>{context.productToShow.title}</span>
          <span className='font-light text-sm'>{context.productToShow.description}</span>
        </div>
        <div className=''>
          <button
            className={`bg-black py-1 mt-5 text-white w-full rounded-lg select-none hover:bg-blue-600 font-bold text-lg`}
            onClick={addProductToCartFromDetail}>
            {context.cartProducts.some(product => product.id === context.productToShow.id) ? 'Already in Cart' : '+ Add to Cart'}
          </button>
        </div>
      </div>
    </aside>
  );
};

export default ProductDetail;
