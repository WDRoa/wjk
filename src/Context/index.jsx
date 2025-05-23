import { createContext, useState, useEffect } from "react";

export const ShoppingCartContext = createContext();

export const initializeLocalStorage = () => {
  const accountInLocalStorage = localStorage.getItem("account");
  const signOutInLocalStorage = localStorage.getItem("sign-out");
  let parsedAccount;
  let parsedSignOut;

  if (!accountInLocalStorage) {
    localStorage.setItem("account", JSON.stringify({}));
    parsedAccount = {};
  } else {
    parsedAccount = JSON.parse(accountInLocalStorage);
  }

  if (!signOutInLocalStorage) {
    localStorage.setItem("sign-out", JSON.stringify(false));
    parsedSignOut = false;
  } else {
    parsedSignOut = JSON.parse(signOutInLocalStorage);
  }
};

export const ShoppingCartProvider = ({ children }) => {
  // My account
  const [account, setAccount] = useState({});

  // Sign out
  const [signOut, setSignOut] = useState(false);

  // SideMenu • Open/Close
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const openSideMenu = () => setIsSideMenuOpen(true);
  const closeSideMenu = () => setIsSideMenuOpen(false);
  const toggleSideMenu = () => {
    setIsSideMenuOpen(!isSideMenuOpen);
    if (!isSideMenuOpen) {
      openSideMenu();
    } else {
      closeSideMenu();
    }
  };

  // Product Detail • Open/Close
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);
  const openProductDetail = () => setIsProductDetailOpen(true);
  const closeProductDetail = () => setIsProductDetailOpen(false);

  // Checkout Side Menu • Open/Close
  const [isCheckoutSideMenuOpen, setIsCheckoutSideMenuOpen] = useState(false);
  const openCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(true);
  const closeCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(false);

  // Close all menus
  const closeAllMenus = () => {
    closeSideMenu();
    closeProductDetail();
    closeCheckoutSideMenu();
  };

  // Add event listener for clicks outside of menus
  useEffect(() => {
    const handleClickOutside = event => {
      if (
        !event.target.closest(".side-menu") &&
        !event.target.closest(".product-detail") &&
        !event.target.closest(".checkout-side-menu")
      ) {
        closeAllMenus();
      }
    };

    document.addEventListener("mouseup", handleClickOutside);

    return () => document.removeEventListener("mouseup", handleClickOutside);
  }, []);

  // Product Detail • Show product
  const [productToShow, setProductToShow] = useState({});

  // Shopping Cart • Add products to cart
  const [cartProducts, setCartProducts] = useState([]);

  // Shopping Cart • Order
  const [order, setOrder] = useState([]);

  // Get products
  const [items, setItems] = useState(null);
  const [filteredItems, setFilteredItems] = useState(null);
  
  useEffect(() => {
    setItems(null); // Clear items before fetching
    fetch("https://fakestoreapi.com/products")
      .then(response => response.json())
      .then(data => setItems(data));
  }, []);

  // Get products by title
  const [searchByTitle, setSearchByTitle] = useState(null);

  // Get products by category
  const [searchByCategory, setSearchByCategory] = useState(
    localStorage.getItem("searchByCategory") || null
  );
  
  const filteredItemsByTitle = (items, searchByTitle) => {
    return items?.filter(item => item.title.toLowerCase().includes(searchByTitle.toLowerCase()));
  };

  const filteredItemsByCategory = (items, searchByCategory) => {
    return items?.filter(item => item.category.toLowerCase() === searchByCategory.toLowerCase());
  };

  const filterBy = (searchType, items, searchByTitle, searchByCategory) => {
    if (searchType === "BY_TITLE") {
      return filteredItemsByTitle(items, searchByTitle);
    }

    if (searchType === "BY_CATEGORY") {
      return filteredItemsByCategory(items, searchByCategory);
    }

    if (searchType === "BY_TITLE_AND_CATEGORY") {
      return filteredItemsByCategory(items, searchByCategory).filter(item =>
        item.title.toLowerCase().includes(searchByTitle.toLowerCase())
      );
    }

    if (!searchType) {
      return items;
    }
  };

  useEffect(() => {
    if (items === null) {
      setFilteredItems(null);
    } else if (searchByTitle && searchByCategory) {
      setFilteredItems(
        filterBy("BY_TITLE_AND_CATEGORY", items, searchByTitle, searchByCategory)
      );
    } else if (searchByTitle && !searchByCategory) {
      setFilteredItems(
        filterBy("BY_TITLE", items, searchByTitle, searchByCategory)
      );
    } else if (!searchByTitle && searchByCategory) {
      setFilteredItems(
        filterBy("BY_CATEGORY", items, searchByTitle, searchByCategory)
      );
    } else {
      setFilteredItems(filterBy(null, items, searchByTitle, searchByCategory));
    }
  }, [items, searchByTitle, searchByCategory]);

  useEffect(() => {
    if (searchByCategory === null) {
      setFilteredItems(items);
    }
  }, [items, searchByCategory]);

  const removeProductFromCart = productId => {
    const updatedCart = cartProducts.filter(
      product => product.id !== productId
    );
    setCartProducts(updatedCart);
  };

  const updateSearchByCategory = category => {
    setSearchByCategory(category);
    if (category) {
      localStorage.setItem("searchByCategory", category);
    } else {
      localStorage.removeItem("searchByCategory");
    }
  };

  return (
    <ShoppingCartContext.Provider value={{        
        isSideMenuOpen,
        openSideMenu,
        closeSideMenu,
        toggleSideMenu,
        openProductDetail,
        closeProductDetail,
        isProductDetailOpen,
        productToShow,
        setProductToShow,
        cartProducts,
        setCartProducts,
        isCheckoutSideMenuOpen,
        openCheckoutSideMenu,
        closeCheckoutSideMenu,
        order,
        setOrder,
        items,
        setItems,
        searchByTitle,
        setSearchByTitle,
        filteredItems,
        searchByCategory,
        setSearchByCategory: updateSearchByCategory,
        removeProductFromCart,
        account,
        setAccount,
        signOut,
        setSignOut,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};
