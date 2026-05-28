export const UNIT_PRICE_IDR = 1399000;
export const ORIGINAL_PRICE_IDR = 1899000;

export const formatIDR = (n) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n);
