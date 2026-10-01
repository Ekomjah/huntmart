import { brandLogo } from "@/utils/cloudinary";

export function BrandGrid({ brands }) {
  return (
    <div className="mx-auto mb-4 grid w-[90vw] max-w-7xl grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      {brands.map((brand) => (
        <div
          key={brand}
          className="group flex items-center gap-2 rounded-lg border border-gray-200 bg-white p-2 transition hover:border-(--hunt-primary) hover:shadow-sm"
        >
          <img
            src={brandLogo(brand)}
            alt={brand}
            width={32}
            height={32}
            loading="lazy"
            decoding="async"
            className="h-8 w-8 shrink-0 rounded-full bg-gray-100 object-contain transition-transform group-hover:scale-105 sm:h-10 sm:w-10"
          />
          <div className="font-pop flex min-w-0 flex-col">
            <span className="truncate text-xs font-semibold sm:text-sm">
              {brand}
            </span>
            <span className="text-[11px] text-gray-500 sm:text-xs">
              Delivery in 48 hrs
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
