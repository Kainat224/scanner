const priceRange = priceValue => {
  const price = parseFloat(priceValue.replace(/,/g, ''));
  const rate = parseFloat((price * 10) / 100);
  return `$${price - rate}-$${price + rate}`;
};
export default priceRange;
