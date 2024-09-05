import { useContext } from "react";
import Layout from "../../Components/Layout";
import Card from "../../Components/Card";
import SkeletonCard from "../../Components/SkeletonCard";
import ProductDetail from "../../Components/ProductDetail";
import { ShoppingCartContext } from "../../Context";

const Home = () => {
  const context = useContext(ShoppingCartContext);

  const renderView = () => {
    if (context.items === null) {
      return Array.from({ length: 16 }).map((_, index) => (
        <SkeletonCard key={index} />
      ));
    } else if (context.filteredItems?.length > 0) {
      return context.filteredItems.map(item => (
        <Card key={item.id} data={item} />
      ));
    } else {
      return (
        <div className="text-center w-full col-span-4">
          <p className="text-md font-normal mt-10 dark:text-gray-300">
            We don't have that product. :-(
          </p>
        </div>
      );
    }
  };

  return (
    <Layout>
      <div className="flex items-center justify-center relative w-80 mx-auto">
        <h1 className="font-medium text-xl dark:text-gray-300">
          Exclusive Products
        </h1>
      </div>
      <p className="font-normal text-sm dark:text-gray-300 mb-2">
        The best place to get your favorite products
      </p>
      <input
        type="text"
        id="search-product"
        name="search"
        placeholder="Search a product"
        className="rounded-lg border border-black w-80 p-4 mb-4 focus:outline-none mx-auto block shadow-lg z-10 dark:bg-black dark:border-white dark:text-gray-300"
        onChange={event => context.setSearchByTitle(event.target.value)}
      />
      <div className="flex justify-center">
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full max-w-screen-lg">
          {renderView()}
        </div>
      </div>
      <ProductDetail />
    </Layout>
  );
};

export default Home;
