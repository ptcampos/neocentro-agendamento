export function addProductToCart({ commit }, newProduct) {
  commit('ADD_PRODUCT_TO_CART', newProduct);
}

export function addProductAmount({ commit }, { product, amount }) {
  commit('ADD_PRODUCT_AMOUNT', { product, amount });
}

export function removeProductAmount({ commit }, { product, amount }) {
  commit('REMOVE_PRODUCT_AMOUNT', { product, amount });
}

export function removeProductFromCart({ commit }, { id }) {
  commit('REMOVE_PRODUCT_FROM_CART', id);
}

export function clearCart({ commit }) {
  commit('CLEAR_CART');
}
