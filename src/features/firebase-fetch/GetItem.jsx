import { ShoppingBag, Plus, Minus, Heart } from "lucide-react";
import { useParams, Outlet, Link } from "react-router";
import { useItem } from "@/hooks/useItem";
import { Navigate } from "react-router";
import { useState } from "react";
import StaticRatings from "@/components/ratings/StaticRatings";
import { cn } from "@/utils/utils";
import { useCartStore } from "@/stores/useCartStore";
import { useLocation } from "react-router";

export default function Item() {
  const [inputVal, setInputVal] = useState(0);
  const [currentThumbnail, setCurrentThumbnail] = useState(0);
  const location = useLocation();

  const currentTab = location.pathname.includes("reviews");

  function checkLength(e) {
    const value = e.target.value;
    const max = e.target.max;
    if (+value <= +max && +value >= 0) {
      setInputVal(value);
    }
  }
  const { id } = useParams();
  const { data: item, isLoading, isError } = useItem(id);
  const [activeImg, setActiveImg] = useState(null);
  const [isHeartFull, setIsHeartFull] = useState(false);
  const filterFunction = (key) => {
    return Object.entries(item)
      .filter(([k]) => k === key)
      .map(([, val]) => val);
  };

  if (isLoading)
    return (
      <div className="mx-auto flex min-h-screen w-[80vw] max-w-[1000px] items-center justify-center bg-gray-50 font-sans text-gray-800">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-(--hunt-primary) border-t-transparent"></div>
      </div>
    );
  if (isError) {
    console.log("some error, ", isError);
    return <Navigate to={`/errorPage`} replace />;
  }
  if (item) {
    const detailsObj = {
      id: filterFunction("id")[0],
      brand: filterFunction("brand")[0],
      category: filterFunction("category")[0],
      sku: filterFunction("sku")[0],
      weight: filterFunction("weight")[0],
      dimensions: filterFunction("dimensions")[0],
      warrantyInformation: filterFunction("warrantyInformation")[0],
      shippingInformation: filterFunction("shippingInformation")[0],
      availabilityStatus: filterFunction("availabilityStatus")[0],
      returnPolicy: filterFunction("returnPolicy")[0],
      minimumOrderQuantity: filterFunction("minimumOrderQuantity")[0],
      meta: filterFunction("meta")[0],
      stock: filterFunction("stock")[0],
      reviews: filterFunction("reviews")[0],
      images: filterFunction("images")[0],
      title: filterFunction("title"),
      tags: filterFunction("tags")[0],
      price: filterFunction("price"),
      discountPercentage: filterFunction("discountPercentage"),
      rating: filterFunction("rating"),
      description: filterFunction("description"),
    };

    console.log(detailsObj.images);
    return (
      <div className="mx-auto flex min-h-screen w-[90vw] max-w-[1000px] items-center justify-center bg-gray-50 font-sans text-gray-800">
        <div
          className={cn(
            "flex h-full flex-wrap items-stretch justify-center gap-2 rounded bg-gray-100 p-4 md:grid md:grid-cols-2",
          )}
        >
          <div className="flex flex-1 flex-col">
            <div className="mx-auto w-[300px] flex-1 rounded bg-gray-200 shadow-lg">
              <img
                src={
                  activeImg ||
                  `https://res.cloudinary.com/ekomjah/image/fetch/w_150,h_150,c_fill,g_auto,q_auto,f_auto,e_sharpen,dpr_auto/${detailsObj.images[0]}`
                }
                alt="item-thumbnail"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="w-full flex w-full items-center justify-center gap-5">
              {detailsObj.images.map((val, index) => {
                return (
                  <div
                    key={index}
                    className="mt-4"
                  >
                    <div
                      className={cn(
                        "w-[50px] cursor-pointer rounded ring-1 ring-gray-700",
                        {
                          "ring-3": currentThumbnail === index,
                        },
                      )}
                      onClick={() => {
                        setCurrentThumbnail(index);
                        setActiveImg(
                          `https://res.cloudinary.com/ekomjah/image/fetch/w_150,h_150,c_fill,g_auto,q_auto,f_auto,e_sharpen,dpr_auto/${val}`,
                        );
                      }}
                    >
                      <img
                        src={`https://res.cloudinary.com/ekomjah/image/fetch/w_150,h_150,c_fill,g_auto,q_auto,f_auto,e_sharpen,dpr_auto/${val}`}
                        alt="item-thumbnail"
                        className="h-full w-full"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <h1 className="text-3xl! font-bold">{detailsObj.title}</h1>
            <div className="mt-4 flex w-full items-center justify-start gap-5">
              {detailsObj.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-block rounded-full bg-gray-200 px-2 py-1 text-sm font-medium text-gray-800 hover:bg-gray-300"
                >
                  {tag.toLowerCase()}
                </span>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center justify-center">
                <p className="font-pop! p-1 text-4xl font-semibold text-gray-700">
                  $
                </p>
                {detailsObj.discountPercentage > 0 ? (
                  <div className="flex items-center justify-center">
                    <p className="text-3xl font-light line-through">
                      {detailsObj.price}
                    </p>
                    <p className="font-pop! p-4 pl-1 text-4xl font-semibold text-gray-700">
                      {(
                        detailsObj.price -
                        (detailsObj.discountPercentage / 100) * detailsObj.price
                      ).toFixed(2)}
                    </p>
                  </div>
                ) : (
                  detailsObj.price
                )}
              </div>
              <StaticRatings ratings={Math.floor(detailsObj.rating)} />
            </div>
            <p className="text-justify">{detailsObj.description}</p>
            <div>
              <label
                className={cn("p-4", {
                  "text-red-600": detailsObj.stock < 1,
                })}
              >
                <b>{detailsObj.stock}</b> items in stock.
              </label>
              <div className="mt-4 grid grid-cols-subgrid items-center">
                {inputVal > 0 && detailsObj.stock > 0 ? (
                  <div className="flex flex-1 items-center justify-between gap-2">
                    <button
                      className="p-3! focus:border-0"
                      onClick={() => {
                        +inputVal >= 1 && setInputVal(+inputVal - 1);
                      }}
                    >
                      <Minus strokeWidth={3} />
                    </button>
                    <p>
                      <input
                        type="number"
                        className="rounded border-2 border-gray-800 text-center font-sans font-semibold outline-0"
                        value={inputVal}
                        onChange={checkLength}
                        max={detailsObj.stock}
                        placeholder="Quantity"
                      />
                    </p>
                    <button
                      className="p-3! focus:outline-0"
                      onClick={() => {
                        +inputVal + 1 <= detailsObj.stock &&
                          setInputVal(+inputVal + 1);
                      }}
                    >
                      <Plus strokeWidth={3} />
                    </button>
                    <div
                      onClick={() => setIsHeartFull(!isHeartFull)}
                      className="cursor-pointer rounded bg-gray-300 p-3 transition-colors duration-300 ease-in hover:bg-(--hunt-primary)"
                    >
                      <Heart
                        fill={isHeartFull ? "red" : "var(--hunt-bg)"}
                        strokeWidth={3}
                      />
                    </div>
                  </div>
                ) : detailsObj.stock < 1 ? (
                  <div className="font-pop cursor-not-allowed bg-red-500 p-4 text-base font-bold !text-white">
                    Out of Stock
                  </div>
                ) : (
                  <div className="mt-4 flex items-center justify-between gap-4">
                    <button
                      className="flex flex-1 items-center justify-around gap-7 bg-black p-2 font-semibold text-white"
                      onClick={() => setInputVal(1)}
                    >
                      <ShoppingBag /> Add To Cart
                    </button>
                    <div
                      onClick={() => setIsHeartFull(!isHeartFull)}
                      className="cursor-pointer rounded bg-gray-300 p-3 transition-colors duration-300 ease-in hover:bg-(--hunt-primary)"
                    >
                      <Heart
                        fill={isHeartFull ? "red" : "var(--hunt-bg)"}
                        strokeWidth={3}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="col-span-2 w-full bg-gray-100">
            <div className="mt-4 ml-5 flex items-center justify-start gap-4 border-b-2 border-gray-300 pb-2">
              <Link
                to={`/products/${id}`}
                className={cn(
                  "font-pop text-bg-500 rounded-full p-2 font-semibold transition-colors duration-300 ease-in",
                  {
                    "bg-indigo-600 text-white hover:bg-indigo-800": !currentTab,
                    "bg-gray-200 text-gray-700 hover:bg-gray-300": currentTab,
                  },
                )}
              >
                Details
              </Link>
              <Link
                to={`/products/${id}/reviews`}
                className={cn(
                  "font-pop text-bg-500 rounded-full p-2 font-semibold transition",
                  {
                    "bg-indigo-600 text-white": currentTab,
                    "bg-gray-200 text-gray-700 hover:bg-gray-300": !currentTab,
                  },
                )}
              >
                Reviews
              </Link>
            </div>
            <Outlet context={{ detailsObj, reviewsObj: detailsObj.reviews }} />
          </div>
        </div>
      </div>
    );
  }
}
