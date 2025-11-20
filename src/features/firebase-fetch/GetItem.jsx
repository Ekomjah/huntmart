import { useParams } from "react-router";
import { useItem } from "../../hooks/useItem";
import { Navigate } from "react-router";
import BarcodeGenerator from "../../components/bar-code/Barcode";
import { useState } from "react";
import StaticRatings from "../../components/ratings/StaticRatings";
export default function Item() {
  const { id } = useParams();
  const { data: item, isLoading, isError } = useItem(id);
  const [activeImg, setActiveImg] = useState(null);
  const filterFunction = (key) => {
    return Object.entries(item)
      .filter(([k]) => k === key)
      .map(([, val]) => val);
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) {
    console.log("some error, ", isError);
    return <Navigate to={`/errorPage`} replace />;
  }
  if (item) {
    return (
      <div className="mx-auto flex min-h-screen w-[80vw] max-w-[1000px] items-center justify-center bg-gray-50 font-sans text-gray-800">
        <div className="grid h-full grid-cols-2 items-stretch justify-center gap-2 rounded bg-gray-100 p-4">
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
            <div className="justify-content flex items-center gap-7">
              {filterFunction("price").map((priceVal, index) => {
                const discount =
                  filterFunction("discountPercentage")[index] || 0;
                const finalPrice =
                  discount > 0
                    ? (priceVal - (discount / 100) * priceVal).toFixed(2)
                    : priceVal;

                return (
                  <div key={index} className="flex items-center justify-center">
                    <p className="font-pop! p-4 text-4xl font-semibold text-gray-700">
                      $
                    </p>
                    {discount > 0 ? (
                      <div className="flex items-center justify-center">
                        {" "}
                        <p className="text-3xl font-normal line-through">
                          {priceVal}
                        </p>
                        <p className="font-pop! p-4 text-4xl font-semibold text-gray-700">
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
            <div className="mt-4 text-2xl font-semibold">Scan Here:</div>
            <BarcodeGenerator meta={filterFunction("meta")[0]} />
            {Object.entries(item)
              .filter(([key]) => key === "brand")
              .map(([_key, val]) => (
                <div key={_key}>
                  <p>
                    Brand:{" "}
                    <b>
                      <i>{val}</i>
                    </b>
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  }
}
