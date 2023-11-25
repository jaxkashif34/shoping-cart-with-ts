const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
  style: 'currency',
  currency: 'USD',
});

export const formatCurrency = (amount: number) => {
  return CURRENCY_FORMATTER.format(amount);
}
