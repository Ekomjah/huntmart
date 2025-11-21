import { useOutletContext } from "react-router";
function Details() {
  const data = useOutletContext();
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
  } = data;
  return (
    <>
      <div>
        <h2>Brand: {brand ?? "N/A"}</h2>
        <p>SKU: {sku ?? "N/A"}</p>
        <p>Weight: {weight ?? "N/A"} kg</p>
        <p>{category ?? "N/A"}</p>
        <div>
          <h2>Dimensions</h2>
          {dimensions ? (
            <div>
              <p>Depth: {dimensions.depth}</p>
              <p>Height: {dimensions.height}</p>
              <p>Width: {dimensions.width}</p>
            </div>
          ) : (
            <p>N/A</p>
          )}
        </div>

        <p>Warranty: {warrantyInformation}</p>
        <p>Shipping: {shippingInformation}</p>
        <p>Status: {availabilityStatus}</p>
        <p>Return Policy: {returnPolicy}</p>
        <p>Minimum Order: {minimumOrderQuantity}</p>
      </div>
    </>
  );
}
export default Details;
