export default function BrandGrid({ brands }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {brands.map((brand) => {
        const encodedBrand = encodeURIComponent(brand);

        return (
          <div
            key={brand}
            className="flex flex-col items-center gap-2 rounded-lg border p-4 transition hover:shadow-md"
          >
            <img
              src={`https://api.dicebear.com/7.x/initials/svg?seed=${encodedBrand}`}
              alt={brand}
              className="h-16 w-16 rounded-full bg-gray-100"
            />
            <span className="text-center text-sm font-medium">{brand}</span>
          </div>
        );
      })}
    </div>
  );
}
