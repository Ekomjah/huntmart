export function getRandomValues(data, count = 8, randomValue = "brand") {
  const brands = [
    ...new Set(
      Object.values(data ?? {}).map((product) => product[randomValue]),
    ),
  ];

  for (let i = brands.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [brands[i], brands[j]] = [brands[j], brands[i]];
  }

  return brands.slice(0, count);
}
