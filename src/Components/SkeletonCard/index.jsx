const SkeletonCard = () => {
  return (
    <div className="bg-white cursor-pointer w-56 h-60 rounded-lg p-2 hover:border-black border shadow-xl mx-4 mb-7 z-10 dark:bg-gray-800 dark:hover:border-white dark:border-black">
      <figure className="relative mb-2 w-full h-4/5 dark:bg-white p-3 rounded-lg select-none border">
        <div className="w-full h-full bg-gray-300 animate-ping rounded-lg"></div>
      </figure>
      <p className="flex justify-around dark:text-gray-300">
        <span className="text-sm font-light truncate bg-gray-300 animate-ping h-4 w-1/2"></span>
        <span className="text-lg font-medium select-none bg-gray-300 animate-ping h-6 w-1/4"></span>
      </p>
    </div>
  );
};

export default SkeletonCard;
