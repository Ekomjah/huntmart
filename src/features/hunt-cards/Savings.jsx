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

export function Savings() {
  <div className="mx-auto mb-8 grid w-[90vw] max-w-7xl grid-cols-1 items-center justify-between space-y-4 md:grid-cols-4 md:space-y-0 md:space-x-4">
    <div className="group rounded-lg border border-gray-300 bg-white shadow-md">
      <div className="flex flex-col p-4">
        <h2 className="font-pop text-xl text-gray-600">Save</h2>
        <div className="text-3xl font-semibold text-(--hunt-primary)">$500</div>
        <p className="mt-4">
          Checkout latest automobile models at crazy discounts
        </p>
      </div>
      <div className="h-48 overflow-hidden rounded-b-lg">
        <img
          src="https://res.cloudinary.com/ekomjah/image/upload/v1767230742/car-car-park_1_cyi07o.jpg"
          alt="furniture"
          className="mt-2 h-full w-full object-cover transition-transform group-hover:scale-105"
        />
      </div>
    </div>
    <div className="group rounded-lg border border-gray-300 bg-white shadow-md">
      <div className="flex flex-col p-4">
        <h2 className="font-pop text-xl text-gray-600">Save</h2>
        <div className="text-3xl font-semibold text-(--hunt-primary)">$250</div>
        <p className="mt-4">
          Explore a wide range of discounted furniture and home decor items
        </p>
      </div>
      <div className="h-48 overflow-hidden rounded-b-lg">
        <img
          src="https://cdn.prod.website-files.com/63e857eaeaf853471d5335ff/63e8c4e6cd367817e964f756_sofa-min.png"
          alt="furniture"
          className="mt-2 h-full w-full object-cover transition-transform group-hover:scale-105"
        />
      </div>
    </div>
    <div className="group rounded-lg border border-gray-300 bg-white shadow-md">
      <div className="flex flex-col p-4">
        <h2 className="font-pop text-xl text-gray-600">Save</h2>
        <div className="text-3xl font-semibold text-(--hunt-primary)">$200</div>
        <p className="mt-4">
          Explore a wide range of discounted furniture and home decor items
        </p>
      </div>
      <div className="h-48 overflow-hidden rounded-b-lg">
        <img
          src="https://cdn.prod.website-files.com/63e857eaeaf853471d5335ff/63e8c4e6cd367817e964f756_sofa-min.png"
          alt="furniture"
          className="mt-2 h-full w-full rounded-b-lg object-cover transition-transform group-hover:scale-105"
        />
      </div>
    </div>
    <div className="group rounded-lg border border-gray-300 bg-white shadow-md">
      <div className="flex flex-col p-4">
        <h2 className="font-pop text-xl text-gray-600">Save</h2>
        <div className="text-3xl font-semibold text-(--hunt-primary)">$200</div>
        <p className="mt-4">
          Explore a wide range of discounted furniture and home decor items
        </p>
      </div>
      <div className="h-48 overflow-hidden rounded-b-lg">
        <img
          src="https://cdn.prod.website-files.com/63e857eaeaf853471d5335ff/63e8c4e6cd367817e964f756_sofa-min.png"
          alt="furniture"
          className="mt-2 h-full w-full object-cover transition-transform group-hover:scale-105"
        />
      </div>
    </div>
  </div>
}

// Todo: work on the component below make it fetch products and display them based on savings
export default function SavingsPage({ getSavings }) {
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
