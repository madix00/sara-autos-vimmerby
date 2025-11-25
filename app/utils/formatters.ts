export function formatCurrencySEK(amount: number): string {
  return amount.toLocaleString("sv-SE", {
    style: "currency",
    currency: "SEK",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}
export function formatMiltal(amount: number): string {
  return (
    amount.toLocaleString("sv-SE", {
      style: "decimal",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }) + " mil"
  );
}

export const calcExklMoms = (price: number, clean?: boolean) => {
  if (isNaN(price)) return 0;

  const exkl = Math.round(price * 0.8).toLocaleString("sv");
  return clean ? `${exkl} kr` : `${exkl} kr ex. moms`;
};
