import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { ShoppingCartContext } from '../../Context';
import './styles.css'

const SideMenu = () => {
    const context = useContext(ShoppingCartContext);
    const activeStyle = 'underline underline-offset-4';

    const handleCategoryClick = (category) => {
        context.setSearchByCategory(category);
        context.setSearchByTitle(null); 
        context.closeSideMenu();  
    };

    return (
        <aside className={`side-menu ml-1 flex flex-col fixed border border-black rounded-lg bg-white p-3 lg:hidden ${context.isSideMenuOpen ? 'block' : 'hidden'}`}>
            <p className='font-bold text-xl select-none mb-2'>Categories</p>
            <ul className='pl-3'>
                <li className='font-semibold select-none hover:text-blue-600 mb-1'>
                    <NavLink
                        to=''
                        onClick={() => handleCategoryClick(null)}
                        className={({ isActive }) =>
                            isActive ? activeStyle : undefined
                        }>
                        All
                    </NavLink>
                </li>
                <li className='font-semibold select-none hover:text-blue-600 mb-1'>
                    <NavLink
                        to='/womens-clothing'
                        onClick={() => handleCategoryClick("women's clothing")}
                        className={({ isActive }) =>
                            isActive ? activeStyle : undefined
                        }>
                        Women's Clothing
                    </NavLink>
                </li>
                <li className='font-semibold select-none hover:text-blue-600 mb-1'>
                    <NavLink
                        to='/mens-clothing'
                        onClick={() => handleCategoryClick("men's clothing")}
                        className={({ isActive }) =>
                            isActive ? activeStyle : undefined
                        }>
                        Men's Clothing
                    </NavLink>
                </li>
                <li className='font-semibold select-none hover:text-blue-600 mb-1'>
                    <NavLink
                        to='/jewelery'
                        onClick={() => handleCategoryClick('jewelery')}
                        className={({ isActive }) =>
                            isActive ? activeStyle : undefined
                        }>
                        Jewelery
                    </NavLink>
                </li>
                <li className='font-semibold select-none hover:text-blue-600 mb-1'>
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
            <p className='font-bold text-xl select-none mb-2 mt-4'>Account</p>
            <ul className='pl-3'>
                <li className='text-black/60 font-medium mb-1'>
                    WDRoa@email.com
                </li>
                <li className='font-semibold select-none hover:text-blue-600 mb-1'>
                    <NavLink
                        to='/my-orders'
                        onClick={context.closeSideMenu} 
                        className={({ isActive }) =>
                            isActive ? activeStyle : undefined
                        }>
                        My Orders
                    </NavLink>
                </li>
                <li className='font-semibold select-none hover:text-blue-600 mb-1'>
                    <NavLink
                        to='/my-account'
                        onClick={context.closeSideMenu} 
                        className={({ isActive }) =>
                            isActive ? activeStyle : undefined
                        }>
                        My Account
                    </NavLink>
                </li>
                <li className='font-semibold select-none hover:text-blue-600 mb-1'>
                    <NavLink
                        to='/sign-in'
                        onClick={context.closeSideMenu} 
                        className={({ isActive }) =>
                            isActive ? activeStyle : undefined
                        }>
                        Sign out
                    </NavLink>
                </li>    
            </ul>
        </aside>
    )    
}

export default SideMenu;
