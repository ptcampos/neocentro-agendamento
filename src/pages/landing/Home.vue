<template>
  <div class="row q-col-gutter-md">
    <div class="col-xs-12" v-show="filter.unidade">
      <div class="row q-col-gutter-md">
        <div class="col-xs-12">
          <div class="text-h5">
            Selecione as Vacinas (Unidade: {{ this.filter.unidade }}
            <q-btn label="Trocar" no-caps color="primary" dense @click="unitySelection = true" />)
          </div>
        </div>
        <div class="col-xs-12">
          <div class="row q-col-gutter-md">
            <div class="col-sm-6 col-xs-12" :key="index" v-for="(product, index) in products">
              <q-card class="my-card">
                <q-img
                  :src="
                    product.images && product.images[0] && product.images[0].src
                      ? product.images[0].src
                      : ''
                  "
                  style="max-height: 200px"
                />

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
                    <div class="col text-h5 text-bold">
                      {{ product.name }}
                    </div>
                    <!-- <div class="col-auto text-grey text-caption q-pt-md row no-wrap items-center">
                      <q-icon name="place" />
                      250 ft
                    </div> -->
                  </div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                  <div class="text-caption text-grey">
                    <div v-html="product.short_description" />
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

    <q-dialog
      v-model="unitySelection"
      persistent
      transition-show="flip-down"
      transition-hide="flip-up"
    >
      <q-card class="bg-primary text-white">
        <q-card-section>
          <div class="text-h6">Selecione a Unidade</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="row q-col-gutter-sm">
            <div
              class="col-xs-12"
              :key="unidade.value"
              v-for="unidade in [
                { label: 'Brasília', value: 'brasilia' },
                { label: 'Curitiba', value: 'curitiba' },
                { label: 'Uberlândia', value: 'uberlandia' },
                { label: 'Valparaíso', value: 'valparaiso' },
              ]"
            >
              <q-btn
                :label="unidade.label"
                color="white"
                text-color="primary"
                class="full-width"
                @click="setCurrentUnity(unidade.value)"
              />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import * as _ from 'lodash';

// import SelectInput from 'components/SelectInput';

export default {
  components: {
    // SelectInput,
  },

  data() {
    return {
      stars: 4,
      products: [],
      filter: {
        unidade: '',
      },
      unitySelection: false,
    };
  },

  mounted() {
    // this.loadProducts();
    const currentUnity = this.$store.getters['general/getCurrentUnity'];
    this.filter.unidade = currentUnity;

    if (!this.filter.unidade) {
      this.unitySelection = true;
    } else {
      this.loadProducts();
    }
  },

  methods: {
    setCurrentUnity(unity) {
      this.filter.unidade = unity;
      this.$store.dispatch('general/setCurrentUnity', unity);
      this.unitySelection = false;
      this.loadProducts();
    },
    async loadProducts() {
      this.$q.loading.show();
      try {
        const products = await this.$axios
          .get('/products', {
            params: { ...this.filter },
          })
          .then(r => r.data);
        this.products = products.filter(
          p =>
            String(p.name)
              .toLowerCase()
              .indexOf('gripe') > -1 ||
            String(p.name)
              .toLowerCase()
              .indexOf('pneumo') > -1,
        );
      } catch (error) {
        console.log(error);
        this.$q.notify({
          message: 'Erro ao carregar os produtos',
          color: 'negative',
        });
      } finally {
        this.$q.loading.hide();
      }
    },
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
