import { ShoppingBag, Plus, Minus, Heart } from "lucide-react";
import { useParams, Outlet, Link } from "react-router";
import { useItem } from "../../hooks/useItem";
import { Navigate } from "react-router";
import BarcodeGenerator from "../../components/bar-code/Barcode";
import { useState } from "react";
import StaticRatings from "../../components/ratings/StaticRatings";
import { cn } from "../../utils/utils";
export default function Item() {
  const [inputVal, setInputVal] = useState("");
  const [isReviewsTabActive, setIsReviewsTabActive] = useState(false);
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
    };

    return (
      <div className="mx-auto flex min-h-screen w-[90vw] max-w-[1000px] items-center justify-center bg-gray-50 font-sans text-gray-800">
        <div
          className={cn(
            "flex h-full flex-wrap items-stretch justify-center gap-2 rounded bg-gray-100 p-4 md:grid md:grid-cols-2",
          )}
        >
          <div className="flex flex-1 flex-col">
            {filterFunction("images").map((val, index) => {
              return (
                <div
                  key={index}
                  className="mx-auto w-[300px] flex-1 rounded bg-gray-200 shadow-lg"
                >
                  <img
                    src={
                      activeImg ||
                      `https://res.cloudinary.com/ekomjah/image/fetch/w_150,h_150,c_fill,g_auto,q_auto,f_auto,e_sharpen,dpr_auto/${val[0]}`
                    }
                    alt="item-thumbnail"
                    className="h-full w-full object-cover"
                  />
                </div>
              );
            })}
            <div className="w-full flex-1">
              {filterFunction("images").map((val, index) => {
                return (
                  <div
                    key={index}
                    className="mt-4 flex w-full items-center justify-center gap-5"
                  >
                    {val.map((imgUrl, imgIndex) => {
                      return (
                        <div
                          key={imgIndex}
                          className="w-[50px] cursor-pointer rounded ring-1 ring-gray-700"
                          onClick={() =>
                            setActiveImg(
                              `https://res.cloudinary.com/ekomjah/image/fetch/w_150,h_150,c_fill,g_auto,q_auto,f_auto,e_sharpen,dpr_auto/${imgUrl}`,
                            )
                          }
                        >
                          <img
                            src={`https://res.cloudinary.com/ekomjah/image/fetch/w_150,h_150,c_fill,g_auto,q_auto,f_auto,e_sharpen,dpr_auto/${imgUrl}`}
                            key={imgIndex}
                            alt="item-thumbnail"
                            className="h-full w-full"
                          />
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            {filterFunction("title").map((val, index) => (
              <div key={index}>
                <h1 className="text-3xl! font-bold">{val}</h1>
              </div>
            ))}
            {filterFunction("tags").map((val, index) => (
              <div
                key={index}
                className="mt-4 flex w-full items-center justify-center gap-5"
              >
                {val.map((tag) => (
                  <span className="inline-block rounded-full bg-gray-200 px-2 py-1 text-sm font-medium text-gray-800 hover:bg-gray-300">
                    {tag.toLowerCase()}
                  </span>
                ))}
              </div>
            ))}
            <div className="justify-content flex items-center gap-2">
              {filterFunction("price").map((priceVal, index) => {
                const discount =
                  filterFunction("discountPercentage")[index] || 0;
                const finalPrice =
                  discount > 0
                    ? (priceVal - (discount / 100) * priceVal).toFixed(2)
                    : priceVal;

                return (
                  <div
                    key={index}
                    className="mx-auto flex items-center justify-center"
                  >
                    <p className="font-pop! p-4 pr-1 text-4xl font-semibold text-gray-700">
                      $
                    </p>
                    {discount > 0 ? (
                      <div className="flex items-center justify-center">
                        {" "}
                        <p className="text-3xl font-light line-through">
                          {priceVal}
                        </p>
                        <p className="font-pop! p-4 pl-1 text-4xl font-semibold text-gray-700">
                          {finalPrice}
                        </p>
                      </div>
                    ) : (
                      finalPrice
                    )}
                  </div>
                );
              })}

              {filterFunction("rating").map((val, index) => (
                <div key={index}>
                  <StaticRatings ratings={Math.floor(val)} />
                </div>
              ))}
            </div>
            {filterFunction("description").map((val, index) => (
              <div key={index}>
                <p>{val}</p>
              </div>
            ))}
            <div>
              {filterFunction("stock").map((val, index) => (
                <div key={index}>
                  <label htmlFor={index}>
                    In Stock: <b>{val}</b>{" "}
                  </label>
                  <div className="flex flex-col items-center justify-center">
                    <div className="flex flex-1 items-center justify-center gap-2">
                      <button
                        className="focus:border-0"
                        onClick={() => {
                          console.log(val);
                          +inputVal - 1 <= val &&
                            +inputVal >= 1 &&
                            setInputVal(+inputVal - 1);
                        }}
                      >
                        <Minus strokeWidth={3} />
                      </button>
                      <p>
                        <input
                          type="number"
                          className="rounded border-2 border-gray-800 text-center font-sans font-semibold outline-0"
                          name={val}
                          id={index}
                          value={inputVal}
                          onChange={checkLength}
                          max={val}
                          placeholder="Quantity"
                        />
                      </p>
                      <button
                        className="focus:outline-0"
                        onClick={() => {
                          +inputVal + 1 <= val &&
                            +inputVal >= -1 &&
                            setInputVal(+inputVal + 1);
                        }}
                      >
                        <Plus strokeWidth={3} />
                      </button>
                    </div>
                    <div className="m-2 mt-4 flex items-center justify-center gap-7">
                      <button className="flex flex-1 items-center justify-between gap-7 bg-black p-2 font-semibold text-white">
                        <ShoppingBag /> Add To Cart
                      </button>
                      <button>
                        <Heart
                          onClick={() => setIsHeartFull(!isHeartFull)}
                          fill={isHeartFull ? "red" : "var(--hunt-bg)"}
                          strokeWidth={3}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-2xl font-semibold">Scan Here:</div>
            <BarcodeGenerator meta={filterFunction("meta")[0]} />
          </div>
          <div className="col-span-2">
            <div className="mt-4 flex items-center justify-start gap-4 border-b-2 border-gray-300 pb-2">
              <Link
                to={`/products/${id}`}
                className={cn(
                  {
                    "border-b-2 border-yellow-800": !isReviewsTabActive,
                  },
                  "font-pop text-bg-500 p-2 font-semibold",
                )}
                onClick={() => setIsReviewsTabActive((prev) => !prev)}
              >
                Details
              </Link>
              <Link
                to={`/products/${id}/reviews`}
                onClick={() => setIsReviewsTabActive((prev) => !prev)}
                className={cn(
                  {
                    "border-b-2 border-yellow-800": isReviewsTabActive,
                  },
                  "font-pop text-bg-500 p-2 font-semibold",
                )}
              >
                Reviews
              </Link>
            </div>
            <Outlet context={detailsObj} />
          </div>
        </div>
      </div>
    );
  }
}
