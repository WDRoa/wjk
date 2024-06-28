import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeftIcon } from '@heroicons/react/24/solid'
import { ShoppingCartContext } from '../../Context'
import Layout from '../../Components/Layout'
import OrderCard from '../../Components/OrderCard'
import { totalPrice } from '../../utils/index' 

function MyOrder() {
  const context = useContext(ShoppingCartContext)
  const currentPath = window.location.pathname
  let index = currentPath.substring(currentPath.lastIndexOf('/') + 1)
  if (index === 'last') index = context.order?.length - 1

  const order = context.order?.[index]

  return (
    <Layout>
      <div className='flex items-center justify-center relative w-80 mb-6'>
        <Link to='/my-orders' className='absolute left-0'>
          <ChevronLeftIcon className='h-6 w-6 text-black cursor-pointer' />
        </Link>
        <h1>My Order</h1>
      </div>
      <div className='flex flex-col w-80'>
        {
          order?.products.map(product => (
            <OrderCard
              key={product.id}
              id={product.id}
              title={product.title}
              imageUrl={product.image}
              price={product.price}
              productCount={product.count} 
              disableQuantityControls={true}
            />
          ))
        }
      </div>
      <div className='flex justify-between items-center w-80 mt-6 px-6'>
        <span className='font-bold text-xl'>Total:</span>
        <span className='font-medium text-2xl bg-slate-200 dark:bg-gray-500 p-1 rounded right-0'>${totalPrice(order?.products)}</span>
      </div>
    </Layout>
  )
}

export default MyOrder
