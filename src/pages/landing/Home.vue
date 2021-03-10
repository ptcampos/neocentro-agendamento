<template>
  <div class="row q-col-gutter-md">
    <div class="col-xs-12">
      <div class="text-h5">Selecione as Vacinas</div>
    </div>
    <div class="col-xs-12">
      <div class="row q-col-gutter-md">
        <div class="col-sm-6 col-xs-12" :key="index" v-for="(product, index) in products">
          <q-card class="my-card">
            <q-img src="https://cdn.quasar.dev/img/chicken-salad.jpg" />

            <q-card-section>
              <q-btn
                fab
                color="primary"
                icon="eva-plus"
                class="absolute"
                style="top: 0; right: 12px; transform: translateY(-50%);"
                @click="addToCart(product)"
              >
                <q-tooltip anchor="center left" self="center right" :offset="[10, 10]">
                  Adicionar ao Carrinho
                </q-tooltip>
              </q-btn>

              <div class="row no-wrap items-center">
                <div class="col text-h5 text-bold ellipsis">
                  {{ product.title }}
                </div>
                <!-- <div class="col-auto text-grey text-caption q-pt-md row no-wrap items-center">
                  <q-icon name="place" />
                  250 ft
                </div> -->
              </div>

              <q-rating v-model="stars" :max="5" size="32px" />
            </q-card-section>

            <q-card-section class="q-pt-none">
              <div class="text-subtitle1">
                Italian, Cafe
              </div>
              <div class="text-caption text-grey">
                Small plates, salads & sandwiches in an intimate setting.
              </div>
              <div class="text-bold text-h6 q-mt-sm">
                {{ product.price | currency }}
              </div>
            </q-card-section>

            <q-separator />

            <q-card-actions>
              <q-btn
                @click="addToCart(product)"
                type="button"
                flat
                icon="eva-shopping-cart-outline"
                label="Adicionar ao Carrinho"
                color="primary"
              />
            </q-card-actions>
          </q-card>
        </div>
      </div>
    </div>

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn
        :disable="!productsInCart.length"
        @click="$router.push('/cart')"
        fab
        icon="eva-shopping-cart-outline"
        color="accent"
      >
        <q-badge v-show="productsInCart.length" color="red" floating>
          {{ getProductsAmountTotal }}
        </q-badge>
        <q-tooltip anchor="center left" self="center right" :offset="[10, 10]">
          Vacinas Selecionadas
        </q-tooltip>
      </q-btn>
    </q-page-sticky>
  </div>
</template>

<script>
import * as _ from 'lodash';

export default {
  data() {
    return {
      stars: 4,
      products: [
        {
          id: 1,
          title: 'Gripe',
          price: 10,
        },
        {
          id: 2,
          title: 'Pneumo 13',
          price: 20,
        },
      ],
    };
  },

  methods: {
    addToCart(product) {
      this.$store.dispatch('general/addProductToCart', JSON.parse(JSON.stringify(product)));
      this.$q.notify({
        message: 'Vacina adicionada ao carrinho',
        color: 'positive',
      });
    },
  },

  computed: {
    productsInCart() {
      return this.$store.getters['general/productsInCart'];
    },
    getProductsAmountTotal() {
      return _.sumBy(this.productsInCart, 'amount');
    },
  },
};
</script>
