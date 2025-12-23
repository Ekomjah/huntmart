import { useOutletContext } from "react-router";
import { useBear } from "@/stores/useBearStore";
import BarcodeGenerator from "../../../components/bar-code/Barcode";

function Details() {
  const { detailsObj } = useOutletContext();
  const bears = useBear((state) => state.bears);
  const increaseBearCounter = useBear((state) => state.increaseBearsCounter);
  const reduceBearCounter = useBear((state) => state.reduceBearsCounter);
  const resetBearCounter = useBear((state) => state.removeAllBears);
  const {
    brand,
    category,
    sku,
    weight,
    dimensions,
    warrantyInformation,
    shippingInformation,
    availabilityStatus,
    returnPolicy,
    minimumOrderQuantity,
    meta,
  } = detailsObj;
  return (
    <div className="mx-auto max-w-5xl px-1">
      <h2 className="font-pop m-4 text-2xl font-semibold">Product Details</h2>
      <div>
        <h2 className="text-sm font-semibold text-gray-800">
          Bears Count: {bears}
        </h2>
        <div>
          <button onClick={increaseBearCounter}>+</button>
          <button onClick={reduceBearCounter}>-</button>
          <button
            className="bg-red-500 p-4 text-white transition-colors duration-300 ease-in hover:bg-red-700"
            onClick={resetBearCounter}
          >
            Reset
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-2 text-left">
        <div className="flex gap-2">
          <h2 className="text-sm font-semibold text-gray-800">Brand:</h2>
          <b>{brand ?? "N/A"}</b>
        </div>
        <p className="text-sm font-semibold text-gray-800">
          <span>Sku:</span> <span>{sku ?? "N/A"}</span>
        </p>
        <p className="text-sm font-semibold text-gray-800">
          Weight: {weight ?? "N/A"} kg
        </p>
        <p className="text-sm font-semibold text-gray-800">
          Category: {category ?? "N/A"}
        </p>
        <div className="flex gap-2 text-sm font-semibold text-gray-800">
          <h2>Dimensions: </h2>
          {dimensions ? (
            <div>
              <p>
                {dimensions.depth} * {dimensions.height} * {dimensions.width}
              </p>
            </div>
          ) : (
            <p>N/A</p>
          )}
        </div>{" "}
        <p className="flex gap-2 text-sm font-semibold text-gray-800">
          <span>Warranty:</span> {warrantyInformation}
        </p>
        <p className="flex gap-2 text-sm font-semibold text-gray-800">
          <span>Shipping:</span> {shippingInformation}
        </p>
        <p className="flex gap-2 text-sm font-semibold text-gray-800">
          <span>Status:</span> {availabilityStatus}
        </p>
        <p className="flex gap-2 text-sm font-semibold text-gray-800">
          <span>Return Policy:</span> {returnPolicy}
        </p>
        <p className="flex gap-2 text-sm font-semibold text-gray-800">
          <span>Minimum Order:</span> {minimumOrderQuantity}
        </p>
      </div>
      <div className="mt-4 text-2xl font-semibold">Scan Here:</div>
      <BarcodeGenerator meta={meta} />
    </div>
  );
}
export default Details;
