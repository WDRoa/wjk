import { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ShoppingCartIcon } from '@heroicons/react/24/solid';
import { ShoppingCartContext } from '../../Context';

const Navbar = () => {
  const context = useContext(ShoppingCartContext);
  const activeStyle = 'underline underline-offset-4';
  const navigate = useNavigate();

  // Sign Out
  const signOut = localStorage.getItem('sign-out');
  const parsedSignOut = JSON.parse(signOut);
  const isUserSignOut = context.signOut || parsedSignOut;

  // Account
  const account = localStorage.getItem('account');
  const parsedAccount = JSON.parse(account);
  const noAccountInLocalStorage = !parsedAccount || Object.keys(parsedAccount).length === 0;
  const noAccountInLocalState = !context.account || Object.keys(context.account).length === 0;
  const hasUserAnAccount = !(noAccountInLocalStorage && noAccountInLocalState);

  const handleSignOut = () => {
    const stringifiedSignOut = JSON.stringify(true);
    localStorage.setItem('sign-out', stringifiedSignOut);
    context.setSignOut(true);
  };

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

  const renderView = () => {
    if (hasUserAnAccount && !isUserSignOut) {
      return (
        <>
          <li className='hidden lg:inline-block text-green-600 font-medium truncate w-56 text-end'>
            {parsedAccount?.email}
          </li>
          <li className='hidden lg:inline-block font-semibold select-none hover:text-blue-600'>
            <NavLink
              to='/my-orders'
              className={({ isActive }) =>
                isActive ? activeStyle : undefined
              }>
              My Orders
            </NavLink>
          </li>
          <li className='hidden lg:inline-block font-semibold select-none hover:text-blue-600'>
            <NavLink
              to='/my-account'
              className={({ isActive }) =>
                isActive ? activeStyle : undefined
              }>
              My Account
            </NavLink>
          </li>
          <li className='hidden lg:inline-block font-semibold select-none hover:text-blue-600'>
            <NavLink
              to='/sign-in'
              onClick={handleSignOut}>
              Sign out
            </NavLink>
          </li>
        </>
      );
    } else {
      return (
        <>
          <li className='hidden lg:inline-block font-semibold select-none hover:text-blue-600'>
            <NavLink
              to={`${isUserSignOut ? '/sign-in' : '/my-orders'}`}>
              My Orders
            </NavLink>
          </li>
          <li className='hidden lg:inline-block font-semibold select-none hover:text-blue-600'>
            <NavLink
              to={`${isUserSignOut ? '/sign-in' : '/my-account'}`}>
              My Account
            </NavLink>
          </li>
          <li className='hidden lg:inline-block font-semibold select-none hover:text-blue-600'>
            <NavLink
              to='/sign-in'
              className={({ isActive }) =>
                isActive ? activeStyle : undefined
              }>
              Sign in
            </NavLink>
          </li>
        </>
      );
    }
  };

  return (
    <nav className='flex justify-between items-center fixed z-10 top-0 w-full py-3 px-8 font-light bg-white border border-b-inherit dark:bg-black dark:text-gray-300 dark:border-x-0 transition-colors duration-500'>
      <svg tabIndex={0}
        onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { context.toggleSideMenu(); }
        }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 block lg:hidden cursor-pointer text-gray-600 hover:text-blue-600 dark:text-gray-700" onClick={context.toggleSideMenu}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
      </svg>
      
      <ul className='flex items-center gap-3'>
        <li className='font-black text-4xl select-none font-gaMaamli hover:text-blue-600'>
          <NavLink 
            to=''
            onClick={() => handleCategoryClick(null)}>
            WJK
          </NavLink>
        </li>
        <li className='hidden lg:inline-block font-semibold select-none hover:text-blue-600'>
          <NavLink
            to=''
            onClick={() => handleCategoryClick(null)}
            className={({ isActive }) =>
              isActive ? activeStyle : undefined}>
            All
          </NavLink>
        </li>
        <li className='hidden lg:inline-block font-semibold select-none hover:text-blue-600'>
          <NavLink
            to='/womens-clothing'
            onClick={() => handleCategoryClick("women's clothing")}
            className={({ isActive }) =>
              isActive ? activeStyle : undefined}>
            Women's Clothing
          </NavLink>
        </li>
        <li className='hidden lg:inline-block font-semibold select-none hover:text-blue-600'>
          <NavLink
            to='/mens-clothing'
            onClick={() => handleCategoryClick("men's clothing")}
            className={({ isActive }) =>
              isActive ? activeStyle : undefined}>
            Men's Clothing
          </NavLink>
        </li>
        <li className='hidden lg:inline-block font-semibold select-none hover:text-blue-600'>
          <NavLink
            to='/jewelery'
            onClick={() => handleCategoryClick('jewelery')}
            className={({ isActive }) =>
              isActive ? activeStyle : undefined}>
            Jewelery
          </NavLink>
        </li>
        <li className='hidden lg:inline-block font-semibold select-none hover:text-blue-600'>
          <NavLink
            to='/electronics'
            onClick={() => handleCategoryClick('electronics')}
            className={({ isActive }) =>
              isActive ? activeStyle : undefined}>
            Electronics
          </NavLink>
        </li>
      </ul>
      <ul className='flex items-center gap-3'>
        {renderView()}
        <li
          className='flex items-center select-none cursor-pointer'
          onClick={() => {
            if (isUserSignOut || !hasUserAnAccount) {
              navigate('/sign-in');
            } else {
              toggleCheckoutSideMenu();
            }
          }}
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              if (isUserSignOut || !hasUserAnAccount) {
                navigate('/sign-in');
              } else {
                toggleCheckoutSideMenu();
              }
            }
          }}
        >
          <ShoppingCartIcon className='h-6 w-6 text-gray-600 hover:fill-blue-600 cursor-pointer dark:fill-gray-700'></ShoppingCartIcon>
          <span className={`ml-0.5 px-2 py-0.5 rounded-full ${context.cartProducts.length > 0 ? 'bg-blue-600 text-white font-normal' : 'bg-transparent font-normal'}`}>
            {context.cartProducts.length}
          </span>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
