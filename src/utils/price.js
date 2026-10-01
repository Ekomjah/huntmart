export function round2(n) {
  const value = Number(n);
  if (!Number.isFinite(value)) return 0;
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

export function salePrice(price, discountPercentage) {
  return discountPercentage
    ? round2(price * (1 - discountPercentage / 100))
    : round2(price);
}

export function formatMoney(n) {
  return round2(n).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}