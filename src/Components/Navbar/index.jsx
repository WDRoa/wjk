import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { ShoppingCartIcon } from '@heroicons/react/24/solid';
import { ShoppingCartContext } from '../../Context';

const Navbar = () => {
  const context = useContext(ShoppingCartContext);
  const activeStyle = 'underline underline-offset-4';

  const toggleCheckoutSideMenu = () => {
    if (context.isCheckoutSideMenuOpen) {
      context.closeCheckoutSideMenu();
    } else {
      context.openCheckoutSideMenu();
    }
  };

  const handleCategoryClick = (category) => {
    context.setSearchByCategory(category);
    context.setSearchByTitle(null); 
  };

  return (
    <nav className='flex justify-between items-center fixed z-10 top-0 w-full py-3 px-8 font-light bg-white border border-b-inherit'>
      <ul className='flex items-center gap-3'>
        <li className='font-black text-4xl select-none font-gaMaamli hover:text-blue-600'>
          <NavLink 
            to=''
            onClick={() => handleCategoryClick(null)}
            >
            WJK
          </NavLink>
        </li>
        <li className='font-semibold select-none hover:text-blue-600'>
          <NavLink
            to=''
            onClick={() => handleCategoryClick(null)}
            className={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>
            All
          </NavLink>
        </li>
        <li className='font-semibold select-none hover:text-blue-600'>
          <NavLink
            to='/womens-clothing'
            onClick={() => handleCategoryClick("women's clothing")}
            className={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>
            Women's Clothing
          </NavLink>
        </li>
        <li className='font-semibold select-none hover:text-blue-600'>
          <NavLink
            to='/mens-clothing'
            onClick={() => handleCategoryClick("men's clothing")}
            className={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>
            Men's Clothing
          </NavLink>
        </li>
        <li className='font-semibold select-none hover:text-blue-600'>
          <NavLink
            to='/jewelery'
            onClick={() => handleCategoryClick('jewelery')}
            className={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>
            Jewelery
          </NavLink>
        </li>
        <li className='font-semibold select-none hover:text-blue-600'>
          <NavLink
            to='/electronics'
            onClick={() => handleCategoryClick('electronics')}
            className={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>
            Electronics
          </NavLink>
        </li>
      </ul>
      <ul className='flex items-center gap-3'>
        <li className='text-black/60 font-medium'>
          WDRoa@email.com
        </li>
        <li className='font-semibold select-none hover:text-blue-600'>
          <NavLink
            to='/my-orders'
            className={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>
            My Orders
          </NavLink>
        </li>
        <li className='font-semibold select-none hover:text-blue-600'>
          <NavLink
            to='/my-account'
            className={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>
            My Account
          </NavLink>
        </li>
        <li className='font-semibold select-none hover:text-blue-600'>
          <NavLink
            to='/sign-in'
            className={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>
            Sign out
          </NavLink>
        </li>
        <li className='flex items-center select-none cursor-pointer' onClick={toggleCheckoutSideMenu}>
          <ShoppingCartIcon className='h-6 w-6 text-black hover:fill-blue-600 cursor-pointer'></ShoppingCartIcon>
          <span className={`ml-0.5 px-2 py-0.5 rounded-full ${context.cartProducts.length > 0 ? 'bg-blue-600 text-white font-normal' : 'bg-transparent font-normal'}`}>
            {context.cartProducts.length}
          </span>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
