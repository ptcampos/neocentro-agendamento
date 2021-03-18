export default function() {
  return {
    productsInCart: [],
    products: [],
    currentUnity: localStorage.getItem('currentUnity') || null,
  };
}
