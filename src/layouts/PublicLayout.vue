<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page padding>
        <div class="row">
          <div class="offset-md-3 offset-sm-1 col-md-6 col-sm-10 col-xs-12">
            <header class="row q-col-gutter-md">
              <div class="col-xs-12 col-sm-4 q-mb-lg">
                <img
                  src="https://neocentrovacinas.com.br/wp-content/uploads/2020/07/Logo-Neocentro.png"
                  alt=""
                  class="logo cursor-pointer"
                  @click="$router.push('/')"
                />
              </div>
              <div class="col-xs-12 col-sm-8">
                <div class="row q-col-gutter-md items-center justify-end q-pr-md">
                  <q-btn
                    icon="eva-lock"
                    dense
                    flat
                    color="primary"
                    label="Acompanhar Agendamento"
                    no-caps
                    to="/auth"
                  />
                </div>
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
export default {
  data() {
    return {};
  },

  mounted() {
    // this.$root.$on('onAddToCart', this.onAddToCartEvent);
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
