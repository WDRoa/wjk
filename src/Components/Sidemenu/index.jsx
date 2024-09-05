import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { ShoppingCartContext } from "../../Context";
import "./styles.css";

const SideMenu = () => {
  const context = useContext(ShoppingCartContext);
  const activeStyle = "underline underline-offset-4";

  // Sign Out
  const signOut = localStorage.getItem("sign-out");
  const parsedSignOut = JSON.parse(signOut);
  const isUserSignOut = context.signOut || parsedSignOut;

  // Account
  const account = localStorage.getItem("account");
  const parsedAccount = JSON.parse(account);
  // Has an account
  const noAccountInLocalStorage = parsedAccount ? Object.keys(parsedAccount).length === 0 : true;
  const noAccountInLocalState = context.account ? Object.keys(context.account).length === 0 : true;
  const hasUserAnAccount = !noAccountInLocalStorage || !noAccountInLocalState;

  const handleSignOut = () => {
    const stringifiedSignOut = JSON.stringify(true);
    localStorage.setItem("sign-out", stringifiedSignOut);
    context.setSignOut(true);
  };

  const handleCategoryClick = category => {
    context.setSearchByCategory(category);
    context.setSearchByTitle(null);
    context.closeSideMenu();
  };

  const renderView = () => {
    if (hasUserAnAccount && !isUserSignOut) {
      return (
        <>
          <li className="lg:inline-block text-green-600 font-medium truncate w-52">
            {parsedAccount?.email}
          </li>
          <li className="lg:inline-block font-semibold select-none hover:text-blue-600">
            <NavLink
              to="/my-orders"
              onClick={context.closeSideMenu}
              className={({ isActive }) => isActive ? activeStyle : undefined }
            >
              My Orders
            </NavLink>
          </li>
          <li className="lg:inline-block font-semibold select-none hover:text-blue-600">
            <NavLink
              to="/my-account"
              onClick={context.closeSideMenu}
              className={({ isActive }) => isActive ? activeStyle : undefined }
            >
              My Account
            </NavLink>
          </li>
          <li className="lg:inline-block font-semibold select-none hover:text-blue-600">
            <NavLink
              to="/sign-in"
              onClick={() => {
                handleSignOut();
                context.closeSideMenu();
              }}
            >
              Sign out
            </NavLink>
          </li>
        </>
      );
    } else {
      return (
        <>
          <li className="lg:inline-block font-semibold select-none hover:text-blue-600">
            <NavLink
              to="/sign-in"
              onClick={context.closeSideMenu}
            >
              My Orders
            </NavLink>
          </li>
          <li className="lg:inline-block font-semibold select-none hover:text-blue-600">
            <NavLink
              to="/sign-in"
              onClick={context.closeSideMenu}
            >
              My Account
            </NavLink>
          </li>
          <li
            className="lg:inline-block font-semibold select-none hover:text-blue-600"
          >
            <NavLink
              to="/sign-in"
              onClick={context.closeSideMenu}
              className={({ isActive }) => isActive ? activeStyle : undefined }
            >
              Sign in
            </NavLink>
          </li>
        </>
      );
    }
  };

  return (
    <aside
      className={`side-menu ml-1 flex flex-col fixed border border-black rounded-lg bg-white p-2 lg:hidden z-20 dark:border-white dark:bg-black dark:text-gray-300 ${
        context.isSideMenuOpen ? "side-menu-open" : "side-menu-closed"
      }`}
      id="navbar-default"
    >
      <p className="font-bold text-xl select-none">Categories</p>
      <ul className="pl-3">
        <li className="font-semibold select-none hover:text-blue-600 mb-1">
          <NavLink
            to=""
            onClick={() => handleCategoryClick(null)}
            className={({ isActive }) => isActive ? activeStyle : undefined }
          >
            All
          </NavLink>
        </li>
        <li className="font-semibold select-none hover:text-blue-600 mb-1">
          <NavLink
            to="/womens-clothing"
            onClick={() => handleCategoryClick("women's clothing")}
            className={({ isActive }) => isActive ? activeStyle : undefined }
          >
            Women's Clothing
          </NavLink>
        </li>
        <li className="font-semibold select-none hover:text-blue-600 mb-1">
          <NavLink
            to="/mens-clothing"
            onClick={() => handleCategoryClick("men's clothing")}
            className={({ isActive }) => isActive ? activeStyle : undefined }
          >
            Men's Clothing
          </NavLink>
        </li>
        <li className="font-semibold select-none hover:text-blue-600 mb-1">
          <NavLink
            to="/jewelery"
            onClick={() => handleCategoryClick("jewelery")}
            className={({ isActive }) => isActive ? activeStyle : undefined }
          >
            Jewelery
          </NavLink>
        </li>
        <li className="font-semibold select-none hover:text-blue-600 mb-1">
          <NavLink
            to="/electronics"
            onClick={() => handleCategoryClick("electronics")}
            className={({ isActive }) => isActive ? activeStyle : undefined }
          >
            Electronics
          </NavLink>
        </li>
      </ul>
      <p className="font-bold text-xl select-none mt-1">Account</p>
      <ul className="pl-3">{renderView()}</ul>
    </aside>
  );
};

export default SideMenu;
