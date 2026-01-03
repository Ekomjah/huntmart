export function BrandGrid({ brands }) {
  return (
    <div className="mx-auto mb-4 grid w-[90vw] max-w-7xl grid-cols-2 gap-4 md:grid-cols-4">
      {brands.map((brand) => {
        const encodedBrand = brand.trim().replace(/\s+/g, "").toLowerCase();
        const img = `https://img.logo.dev/name/${encodedBrand}?token=${import.meta.env.VITE_LOGO_DEV_PUBLIC_KEY}&retina=true&size=64`;
        console.log("brand image url", img);
        console.log("encodedBrand", encodedBrand);

        return (
          <div
            key={brand}
            className="group flex items-center justify-between gap-2 rounded-lg border border-gray-300 p-4 transition hover:border-black hover:shadow-md"
          >
            <img
              src={`https://img.logo.dev/name/${encodedBrand}?token=pk_DobpyacUTjWTJcYMlq_OYA&retina=true&size=64`}
              alt={brand}
              className="h-8 w-8 rounded-full bg-gray-100 transition-transform group-hover:scale-105 lg:h-16 lg:w-16"
            />
            <div className="font-pop flex flex-col">
              <span className="text-center text-base font-semibold md:text-lg">
                {brand}
              </span>
              <span className="text-sm md:text-base">
                Delivery within 48 hrs
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
