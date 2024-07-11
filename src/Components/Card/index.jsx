import { useContext } from 'react'
import { PlusIcon, CheckIcon } from '@heroicons/react/24/solid'
import { ShoppingCartContext } from '../../Context'

const Card = (data) => {
  const context = useContext(ShoppingCartContext)

  const showProduct = (productDetail) => {
    context.openProductDetail()
    context.setProductToShow(productDetail)
    context.closeCheckoutSideMenu()
  }

  const addProductsToCart = (event, productData) => {
    event.stopPropagation()
    context.setCount(context.count + 1)
    context.setCartProducts([...context.cartProducts, productData])
    context.closeProductDetail()
  }
  

  const removeProductsFromCart = (event, productId) => {
    event.stopPropagation()
    context.removeProductFromCart(productId)
  }

  const renderIcon = (id) => {
    const isInCart = context.cartProducts.some(product => product.id === id)

    if (isInCart) {
      return (
        <div
          className='absolute top-0 right-0 flex justify-center items-center bg-black w-6 h-6 rounded-full m-2 p-1'
          onClick={(event) => removeProductsFromCart(event, id)}>
          <CheckIcon className='h-6 w-6 text-white hover:text-blue-600'></CheckIcon>
        </div>
      )
    } else {
      return (
        <div
          className='absolute top-0 right-0 flex justify-center items-center bg-white w-6 h-6 rounded-full m-2 p-1'
          onClick={(event) => addProductsToCart(event, data.data)}>
          <PlusIcon className='h-6 w-6 text-black hover:text-blue-600'></PlusIcon>
        </div>
      )
    }
  }

  return (
    <div
      className='bg-white cursor-pointer w-56 h-60 rounded-lg p-2 hover:border hover:border-black shadow-xl mx-4 mb-7' 
      onClick={() => showProduct(data.data)}>
      <figure className='relative mb-2 w-full h-4/5 select-none'>
        <span className='absolute bottom-0 left-0 bg-white/60 rounded-lg text-black text-xs m-2 px-3 py-0.5'>{data.data.category}</span>
        <img loading='lazy' className='max-w-full max-h-full object-cover rounded-lg' src={data.data.image} alt={data.data.title} />
        {renderIcon(data.data.id)}
      </figure>
      <p className='flex justify-around'>
        <span className='text-sm font-light truncate'>{data.data.title}</span>
        <span className='text-lg font-medium select-none'>${data.data.price}</span>
      </p>
    </div>
  )
}

export default Card
