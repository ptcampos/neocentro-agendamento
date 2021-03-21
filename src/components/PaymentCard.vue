<template>
  <div class="row q-col-gutter-md">
    <div class="col-xs-12">
      <div class="text-h6">Pagamento:</div>
    </div>
    <div class="col-xs-12" v-show="!currentUser || !currentUser.unidade">
      <p class="text-grey-8">Acesse a sua conta para visualizar as opções de pagamento</p>
    </div>
    <div class="col-xs-12 relative-position" v-show="currentUser && currentUser.unidade">
      <q-list class="rounded-borders">
        <q-expansion-item
          default-opened
          :key="index"
          v-for="(paymentOption, index) in paymentOptions"
        >
          <template v-slot:header>
            <q-item-section avatar>
              <q-avatar>
                <q-icon color="orange" name="eva-credit-card-outline" />
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label lines="1">{{ paymentOption.title }}</q-item-label>
            </q-item-section>
          </template>

          <q-card>
            <q-card-section>
              <div>{{ paymentOption.description }}</div>
              <q-form ref="paymentForm" @submit.prevent="proccessPayment">
                <div class="row q-col-gutter-sm">
                  <div class="col-xs-12">
                    <TextInput
                      v-model="payment.name"
                      @input="val => (payment.name = val.toUpperCase())"
                      label="Titular"
                      :required="true"
                    />
                  </div>
                  <div class="col-xs-12 col-sm-12">
                    <TextInput
                      v-model="payment.cardNumber"
                      label="Número do Cartão"
                      mask="#### #### #### ####"
                      :required="true"
                    />
                  </div>
                  <div class="col-xs-4 col-sm-4">
                    <TextInput v-model="payment.cvv" label="CVV" mask="###" :required="true" />
                  </div>
                  <div class="col-xs-4 col-sm-4">
                    <TextInput
                      v-model="payment.month"
                      label="Mês Vencimento"
                      mask="##"
                      :required="true"
                    />
                  </div>
                  <div class="col-xs-4 col-sm-4">
                    <TextInput
                      v-model="payment.year"
                      label="Ano Vencimento"
                      mask="####"
                      :required="true"
                    />
                  </div>
                  <div class="col-xs-12">
                    <TextInput v-model="payment.zip" label="CEP Cobrança" :required="true" />
                  </div>
                  <div class="col-xs-12">
                    <TextInput
                      v-model="payment.address"
                      @input="val => (payment.address = val.toUpperCase())"
                      label="Endereço"
                      :required="true"
                    />
                  </div>
                  <div class="col-xs-9">
                    <TextInput
                      v-model="payment.city"
                      @input="val => (payment.city = val.toUpperCase())"
                      label="Cidade"
                      :required="true"
                    />
                  </div>
                  <div class="col-xs-3">
                    <TextInput v-model="payment.uf" label="UF" mask="AA" :required="true" />
                  </div>
                  <div class="col-xs-12">
                    <TextInput v-model="payment.addressNumber" label="Número" :required="true" />
                  </div>
                  <div class="col-xs-12">
                    <TextInput v-model="payment.addressComplement" label="Complemento" />
                  </div>
                </div>

                <q-separator class="q-mt-sm q-mb-sm" />

                <div class="row justify-end">
                  <q-btn type="submit" label="Realizar Pagamento" no-caps color="primary" />
                </div>
              </q-form>
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </q-list>
      <q-inner-loading :showing="loading">
        <q-spinner-bars size="50px" color="primary" />
      </q-inner-loading>
    </div>
  </div>
</template>

<script>
import { getUser } from '../services/User';
import TextInput from 'components/TextInput';

export default {
  components: {
    TextInput,
  },

  data() {
    return {
      loading: false,
      paymentOptions: [],
      currentUser: {},
      payment: {},
    };
  },

  async mounted() {
    this.currentUser = getUser();
    this.init();
    this.$root.$on('onUpdateCurrentUser', this.updateCurrentUser);
  },

  beforeDestroy() {
    this.$root.$off('onUpdateCurrentUser', this.updateCurrentUser);
  },

  methods: {
    async init() {
      this.getFormasDePagamento();
    },
    async getFormasDePagamento() {
      if (!this.currentUser) {
        return;
      }
      this.loading = true;
      try {
        const paymentOptions = await this.$axios
          .get('/payment-options', {
            params: {
              ...this.currentUser,
            },
          })
          .then(r => r.data);
        // console.log(paymentOptions)
        this.paymentOptions = paymentOptions.filter(p => p.enabled);
      } catch (error) {
        console.log(error);
        this.$q.notify({
          message: 'Formas de pagamento não encontradas, tente novamente mais tarde',
          color: 'negative',
        });
      } finally {
        this.loading = false;
      }
    },
    updateCurrentUser(currentUser) {
      this.currentUser = currentUser ? JSON.parse(JSON.stringify(currentUser)) : {};
      if (currentUser) {
        this.init();
      }
    },
    async proccessPayment() {
      // const isValid = await this.$refs.paymentForm[0].validate()
      this.$q.loading.show();
      try {
        // check if value is bigger than 0
        // other validations
        // w8 for confirmation
        // go to calendar schedule
        // get payment token and send to schedule
        // save order in woocommerce
        // await this.$axios.post('/process-payment', {
        //   ...this.payment,
        // });
        this.$router.push(`/schedule?pt=${1234567}`);
      } catch (error) {
        console.log(error);
        this.$q.notify({
          message: 'Erro ao processar o pagamento, verifique os dados do seu cartão',
          color: 'negative',
        });
      } finally {
        this.$q.loading.hide();
      }
    },
  },
};
</script>

<style></style>
