export const getRandomProducts = (data, count = 6) => {
  const products = Object.entries(data);
  let lengthCounter = products.length - 1;
  while (lengthCounter > 0) {
    const newIndex = Math.floor(Math.random() * (lengthCounter + 1));
    lengthCounter--;
    [products[lengthCounter], products[newIndex]] = [
      products[newIndex],
      products[lengthCounter],
    ];
  }
  return products.slice(0, count);
};
