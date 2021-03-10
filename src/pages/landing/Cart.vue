<template>
  <div class="row q-col-gutter-md">
    <div class="col-xs-12">
      <div class="text-h5">Vacinas Selecionadas</div>
    </div>
    <div class="col-xs-12">
      <CartProducts />
    </div>
    <div class="col-xs-12 text-center">
      <q-btn
        label="Ir para pagamento"
        to="/payment"
        icon="eva-credit-card-outline"
        no-caps
        color="primary"
        size="md"
        :disable="emptyCart"
      />
    </div>
    <div class="col-xs-12 text-center">
      <q-btn
        label="Escolher outras vacinas"
        to="/"
        icon="eva-plus"
        no-caps
        flat
        color="secondary"
      />
    </div>
  </div>
</template>

<script>
import CartProducts from 'components/CartProducts';

export default {
  components: {
    CartProducts,
  },

  data() {
    return {};
  },

  mounted() {},

  methods: {},

  computed: {
    products() {
      return this.$store.getters['general/productsInCart'];
    },
    emptyCart() {
      return !this.products.length;
    },
  },
};
</script>
