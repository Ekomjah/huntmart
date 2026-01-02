import { ArrowRight } from "lucide-react";
export function HuntCategories({ collection }) {
  return (
    <div
      key={collection.title}
      className="group relative h-64 cursor-pointer overflow-hidden rounded-xl"
    >
      <img
        src={collection.img}
        alt={collection.title}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
      <div className="absolute inset-0 flex flex-col justify-end p-6">
        <h3 className="mb-1 text-2xl font-bold text-white">
          {collection.title}
        </h3>
        <p className="mb-3 text-sm text-gray-300">{collection.desc}</p>
        <span className="inline-flex items-center gap-2 font-semibold text-(--hunt-primary) opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          Explore <ArrowRight size={18} />
        </span>
      </div>
    </div>
  );
}
