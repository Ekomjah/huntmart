// const getSavings = (amountToSave) => {
//   const arrayOfProducts = Object.values(products);
//   const discountedToAmountArray = arrayOfProducts.filter(
//     (product) =>
//       (product.discountPercentage / 100) * product.price >= amountToSave,
//   );
//   if (discountedToAmountArray.length > 0) {
//     console.log(discountedToAmountArray);
//     return discountedToAmountArray;
//   }
//   return null;
// };

export default function Savings({ getSavings }) {
  return (
    <div>
      <div>
        <h2>Save $100</h2>
        {getSavings(100)?.map((product) => (
          <div key={product.id}>
            <h3>{product.title}</h3>
            <p>Price: ${product.price}</p>
            <p>Discount: {product.discountPercentage}%</p>
          </div>
        )) || <p>No products found for this saving amount.</p>}
      </div>
      <div>
        <h2>Save $50</h2>
        {getSavings(50)?.map((product) => (
          <div key={product.id}>
            <h3>{product.title}</h3>
            <p>Price: ${product.price}</p>
            <p>Discount: {product.discountPercentage}%</p>
          </div>
        )) || <p>No products found for this saving amount.</p>}
      </div>
      <div>
        <h2>Save $25</h2>
        {getSavings(25)?.map((product) => (
          <div key={product.id}>
            <h3>{product.title}</h3>
            <p>
              Price: <span className="line-through">${product.price}</span>$
              {(
                product.price -
                (product.price * product.discountPercentage) / 100
              ).toFixed(2)}
            </p>
            <p>Discount: {product.discountPercentage}%</p>
          </div>
        )) || <p>No products found for this saving amount.</p>}
      </div>
      <div>
        <h2>Save $10</h2>
        {getSavings(10)?.map((product) => (
          <div key={product.id}>
            <h3>{product.title}</h3>
            <p>Price: ${product.price}</p>
            <p>Discount: {product.discountPercentage}%</p>
          </div>
        )) || <p>No products found for this saving amount.</p>}
      </div>
    </div>
  );
}
