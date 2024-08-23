export const totalPrice = cartProducts => {
  const total = cartProducts.reduce((total, product) => {
    return total + (product.price * (product.count || 1))
  }, 0)
  return parseFloat(total.toFixed(2))
};
