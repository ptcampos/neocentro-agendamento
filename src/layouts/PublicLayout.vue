<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page padding>
        <div class="row">
          <div class="offset-md-2 offset-sm-1 col-md-8 col-sm-10 col-xs-12">
            <header class="row q-col-gutter-md">
              <div class="col-xs-12 col-sm-4 q-mb-lg">
                <img
                  src="https://neocentrovacinas.com.br/wp-content/uploads/2020/07/Logo-Neocentro.png"
                  alt=""
                  class="logo cursor-pointer"
                  @click="$router.push('/')"
                />
              </div>
            </header>
            <router-view />
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { getUser } from '../services/User';

export default {
  data() {
    return {};
  },

  mounted() {
    // this.$root.$on('onAddToCart', this.onAddToCartEvent);
    // check for logged USER
    if (getUser()) {
      this.$store.dispatch('users/setLoggedUser', getUser());
    }
  },

  beforeDestroy() {
    // this.$root.$off('onAddToCart', this.onAddToCartEvent);
  },

  methods: {},

  computed: {},
};
</script>

<style lang="stylus" scoped>
header
  -webkit-box-shadow: 0 8px 6px -6px black;
  -moz-box-shadow: 0 8px 6px -6px black;
  box-shadow: 0 3px 6px -6px black;
  margin-bottom 30px
.logo
  display: block
  margin: 0 auto
  max-width: 100%
  @media only screen and (max-width: 768px) {
    max-width 100%
    padding-top: 20px
  }
.my-card
  width: 100%
</style>
