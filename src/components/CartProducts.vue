<template>
  <q-list>
    <q-item v-show="!products || !products.length">
      <q-item-section class="text-bold">
        <div class="text-body">Nenhuma vacina adicionada ao carrinho</div>
      </q-item-section>
      <q-item-section side>
        <q-btn label="Selecionar Vacinas" no-caps color="primary" @click="$router.push('/')" />
      </q-item-section>
    </q-item>
    <q-item :key="index" v-for="(product, index) in products">
      <q-item-section thumbnail>
        <img
          :src="
            product.images && product.images[0] && product.images[0].src
              ? product.images[0].src
              : ''
          "
        />
      </q-item-section>
      <q-item-section>
        <div class="row q-col-gutter-sm">
          <div class="col-xs-12">
            {{ product.name }}
          </div>
          <div class="col-xs-12">
            <div class="row items-center">
              <q-btn
                icon="eva-minus"
                size="sm"
                dense
                round
                @click="removeProductAmount(product, 1)"
              />
              <span class="q-ml-sm q-mr-sm">{{ product.amount }}</span>
              <q-btn icon="eva-plus" size="sm" dense round @click="addProductAmount(product, 1)" />
            </div>
          </div>
        </div>
      </q-item-section>
      <q-item-section side>
        <div class="row q-col-gutter-md items-center">
          <div>
            {{ getProductTotalPrice(product) | currency }}
          </div>
          <div class="actions">
            <q-btn
              @click="confirmRemove(product)"
              class="q-ml-sm"
              round
              icon="delete"
              size="sm"
              color="negative"
            >
              <q-tooltip anchor="center left" self="center right" :offset="[10, 10]">
                Remover Vacina
              </q-tooltip>
            </q-btn>
          </div>
        </div>
      </q-item-section>
    </q-item>
    <q-separator v-show="products && products.length" />
    <q-item v-show="products && products.length">
      <q-item-section class="text-bold">
        <div class="text-h6">Total a Pagar:</div>
      </q-item-section>
      <q-item-section side>
        <div class="text-h6">
          {{ cartTotalPrice | currency }}
        </div>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
import * as _ from 'lodash';

export default {
  methods: {
    addProductAmount(product, amount) {
      this.$store.dispatch('general/addProductAmount', {
        product,
        amount,
      });
    },
    removeProductAmount(product, amount) {
      this.$store.dispatch('general/removeProductAmount', {
        product,
        amount,
      });
    },
    getProductTotalPrice(product) {
      return +product.amount * product.price;
    },
    confirmRemove(product) {
      if (confirm('Essa ação não poderá ser desfeita')) {
        this.$store.dispatch('general/removeProductFromCart', product);
      }
    },
  },

  computed: {
    products() {
      return this.$store.getters['general/productsInCart'];
    },
    cartTotalPrice() {
      return _.sumBy(this.products, product => {
        return +product.amount * product.price;
      });
    },
  },
};
</script>

<style></style>
