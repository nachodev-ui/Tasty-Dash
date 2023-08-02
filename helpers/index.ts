export const formatearDinero = (cantidad: Number) => {
  return cantidad.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  })
}
