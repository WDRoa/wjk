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
        <li className=' font-black text-lg'>
          <NavLink to='/'>
            WJK
          </NavLink>
        </li>
        <li className='font-semibold'>
          <NavLink
            to='/'
            className={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>
            All
          </NavLink>
        </li>
        <li className='font-semibold'>
          <NavLink
            to='/clothes'
            className={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>
            Clothes
          </NavLink>
        </li>
        <li className='font-semibold'>
          <NavLink
            to='/electronics'
            className={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>
            Electronics
          </NavLink>
        </li>
        <li className='font-semibold'>
          <NavLink
            to='/furnitures'
            className={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>
            Furnitures
          </NavLink>
        </li>
        <li className='font-semibold'>
          <NavLink
            to='/toys'
            className={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>
            Toys
          </NavLink>
        </li>
        <li className='font-semibold'>
          <NavLink
            to='/others'
            className={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>
            Others
          </NavLink>
        </li>
      </ul>
      <ul className='flex items-center gap-3'>
        <li className='text-black/60 font-medium'>
          WDRoa@email.com
        </li>
        <li className='font-semibold'>
          <NavLink
            to='/my-orders'
            className={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>
            My Orders
          </NavLink>
        </li>
        <li className='font-semibold'>
          <NavLink
            to='/my-account'
            className={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>
            My Account
          </NavLink>
        </li>
        <li className='font-semibold'>
          <NavLink
            to='/sing-in'
            className={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>
            Sign In
          </NavLink>
        </li>
        <li className='flex'>
          <ShoppingCartIcon className='h-6 w-6 text-black'></ShoppingCartIcon>
          {context.count}
        </li>
      </ul>
    </nav>
  )
}

export default Navbar