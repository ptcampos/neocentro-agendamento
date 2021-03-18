export function ADD_PRODUCT_TO_CART(state, newProduct) {
  const dupProductIndex = state.productsInCart.findIndex(product => product.id === newProduct.id);
  if (dupProductIndex > -1) {
    const dupProduct = state.productsInCart.find(product => product.id === newProduct.id);
    state.productsInCart.splice(dupProductIndex, 1, {
      ...dupProduct,
      amount: +dupProduct.amount + 1,
    });
  } else {
    state.productsInCart.push({
      ...newProduct,
      amount: 1,
    });
  }
}

export function ADD_PRODUCT_AMOUNT(state, { product, amount }) {
  const productInList = state.productsInCart.find(p => p.id === product.id);
  if (productInList) {
    productInList.amount += +amount;
  }
}

export function REMOVE_PRODUCT_AMOUNT(state, { product, amount }) {
  const productInList = state.productsInCart.find(p => p.id === product.id);
  if (productInList && +productInList.amount > 0) {
    productInList.amount -= +amount;

    if (productInList.amount === 0) {
      REMOVE_PRODUCT_FROM_CART(state, product.id);
    }
  }
}

export function REMOVE_PRODUCT_FROM_CART(state, id) {
  const productInListIndex = state.productsInCart.findIndex(p => p.id === +id);
  if (productInListIndex > -1) {
    state.productsInCart.splice(productInListIndex, 1);
  }
}

export function CLEAR_CART(state) {
  state.productsInCart = [];
}
