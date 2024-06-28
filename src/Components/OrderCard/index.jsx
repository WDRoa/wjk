import { useState, useContext } from 'react'
import { XMarkIcon } from '@heroicons/react/24/solid'
import { ShoppingCartContext } from '../../Context'

const OrderCard = ({ id, title, imageUrl, price, handleDelete, productCount = 1, disableQuantityControls = false }) => {
  const context = useContext(ShoppingCartContext)
  const [count, setCount] = useState(productCount) 

  const updateProductCount = (newCount) => {
    const updatedCart = context.cartProducts.map(product =>
      product.id === id ? { ...product, count: newCount } : product
    )
    context.setCartProducts(updatedCart)
  }

  const increaseProductCount = () => {
    setCount(prevCount => {
      const newCount = prevCount + 1
      updateProductCount(newCount)
      return newCount
    })
  }

  const decreaseProductCount = () => {
    setCount(prevCount => {
      const newCount = prevCount > 1 ? prevCount - 1 : 1
      updateProductCount(newCount)
      return newCount
    })
  }

  let renderXMarkIcon
  if (handleDelete) {
    renderXMarkIcon = <XMarkIcon onClick={() => handleDelete(id)} className='h-6 w-6 text-black cursor-pointer'></XMarkIcon>
  }

  return (
    <div className="flex justify-between items-center mb-3">
      <div className='flex items-center gap-2'>
        <figure className='w-20 h-20 select-none'>
          <img className='w-20 h-20 min-w-20 object-contain rounded-md p-2' src={imageUrl} alt={title} />
        </figure>
        <div className='flex flex-col'>
          <p className='text-sm font-light w-2/3 line-clamp-1'>{title}</p>
          {!disableQuantityControls && (
            <div className='flex items-center gap-2 mt-1'>
              <button 
                onClick={decreaseProductCount} 
                className='bg-black py-3 text-white rounded-lg font-black w-6 h-6 flex justify-center items-center select-none'
              >
                -
              </button>
              <span className='select-none flex items-center justify-center w-6 h-6 bg-slate-200 dark:bg-gray-500'>{count}</span>
              <button 
                onClick={increaseProductCount} 
                className='bg-black py-3 text-white rounded-lg font-bold w-6 h-6 flex justify-center items-center select-none'
              >
                +
              </button>
            </div>
          )}
          {disableQuantityControls && (
            <span className='text-sm font-bold'>Amount: {count}</span>
          )}
        </div>
      </div>
      <div className='flex items-center gap-2'>
        <p className='text-lg font-medium select-none'>${(price * count).toFixed(2)}</p>
        {renderXMarkIcon}
      </div>
    </div>
  )
}

export default OrderCard
