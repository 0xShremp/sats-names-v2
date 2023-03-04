const ResponsiveSizes = () => {
  if (process.env.NODE_ENV === "production") {
    return null;
  }

  return (
    <div className="fixed z-50 p-4 bg-gray-500 bottom-4 left-4 rounded-xl">
      <div className="block text-white sm:hidden md:hidden lg:hidden xl:hidden">
        XS
      </div>
      <div className="hidden text-white sm:block md:hidden lg:hidden xl:hidden">
        SM
      </div>
      <div className="hidden text-white sm:hidden md:block lg:hidden xl:hidden">
        MD
      </div>
      <div className="hidden text-white sm:hidden md:hidden lg:block xl:hidden">
        LG
      </div>
      <div className="hidden text-white sm:hidden md:hidden lg:hidden xl:block">
        XL
      </div>
    </div>
  );
};

export default ResponsiveSizes;
