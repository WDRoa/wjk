import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { ShoppingCartIcon } from '@heroicons/react/24/solid'
import { ShoppingCartContext } from '../../Context'

const Navbar = () => {
  const context = useContext(ShoppingCartContext)
  const activeStyle = 'underline underline-offset-4'

  return (
    <nav className='flex justify-between items-center fixed z-10 top-0 w-full py-3 px-8 text-base font-light bg-white border border-b-inherit'>
      <ul className='flex items-center gap-3'>
        <li className='font-black text-lg select-none'>
          <NavLink to='/'
            onClick={() => context.items()}
            >
            WJK
          </NavLink>
        </li>
        <li className='font-semibold select-none'>
          <NavLink
            to='/'
            onClick={() => context.items()}
            className={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>
            All
          </NavLink>
        </li>
        <li className='font-semibold select-none'>
          <NavLink
            to='/jewelery'
            onClick={() => context.setSearchByCategory('jewelery')}
            className={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>
            Jewelery
          </NavLink>
        </li>
        <li className='font-semibold select-none'>
          <NavLink
            to='/electronics'
            onClick={() => context.setSearchByCategory('electronics')}
            className={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>
            Electronics
          </NavLink>
        </li>
        <li className='font-semibold select-none'>
          <NavLink
            to='/mens-clothing'
            onClick={() => context.setSearchByCategory("men's clothing")}
            className={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>
            Men's Clothing
          </NavLink>
        </li>
        <li className='font-semibold select-none'>
          <NavLink
            to='/womens-clothing'
            onClick={() => context.setSearchByCategory("women's clothing")}
            className={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>
            Women's Clothing
          </NavLink>
        </li>
      </ul>
      <ul className='flex items-center gap-3'>
        <li className='text-black/60 font-medium'>
          WDRoa@email.com
        </li>
        <li className='font-semibold select-none'>
          <NavLink
            to='/my-orders'
            className={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>
            My Orders
          </NavLink>
        </li>
        <li className='font-semibold select-none'>
          <NavLink
            to='/my-account'
            className={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>
            My Account
          </NavLink>
        </li>
        <li className='font-semibold select-none'>
          <NavLink
            to='/sign-in'
            className={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>
            Sign In
          </NavLink>
        </li>
        <li className='flex select-none'>
          <ShoppingCartIcon className='h-6 w-6 text-black'></ShoppingCartIcon>
          {context.cartProducts.length}
        </li>
      </ul>
    </nav>
  )
}

export default Navbar