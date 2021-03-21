<template>
  <div class="row q-col-gutter-md">
    <div class="col-xs-12" v-show="filter.unidade">
      <q-form @submit="getOrderInfo">
        <div class="row q-col-gutter-md">
          <div class="col-xs-12">
            <div class="text-h5">
              Unidade: {{ filter.unidade }}
              <q-btn label="Trocar" no-caps color="primary" dense @click="unitySelection = true" />
            </div>
          </div>
          <div class="col-xs-12">
            <TextInput type="tel" v-model="filter.code" label="Código do Pedido" :required="true" />
          </div>
          <div class="col-xs-12">
            <q-btn
              type="submit"
              class="full-width"
              no-caps
              label="Buscar Informações"
              color="primary"
            />
          </div>
        </div>
      </q-form>
      <q-separator class="q-mt-sm q-mb-sm" />
      <div class="row q-col-gutter-md">
        <div class="col-xs-12" v-show="!detalhesDoPedido.id">
          <p>Preencha o código do pedido para buscar</p>
        </div>
        <div
          class="col-xs-12"
          v-show="detalhesDoPedido.status && detalhesDoPedido.status === 'completed'"
        >
          <q-banner dense inline-actions class="text-white bg-red">
            Esse pedido já foi concluído
          </q-banner>
        </div>
        <div
          class="col-xs-12"
          v-show="detalhesDoPedido.status && detalhesDoPedido.status === 'cancelled'"
        >
          <q-banner dense inline-actions class="text-white bg-red">
            Esse pedido foi cancelado
          </q-banner>
        </div>
        <div
          class="col-xs-12"
          v-show="detalhesDoPedido.status && detalhesDoPedido.status === 'refunded'"
        >
          <q-banner dense inline-actions class="text-white bg-red">
            Esse pedido foi Reembolsado
          </q-banner>
        </div>
        <div
          class="col-xs-12"
          v-show="
            (detalhesDoPedido.status && detalhesDoPedido.status === 'pending') ||
              detalhesDoPedido.status === 'on-hold'
          "
        >
          <q-banner dense inline-actions class="text-white bg-red">
            Esse pedido está com Pagamento Pendente
          </q-banner>
        </div>
        <div class="col-xs-12" v-show="detalhesDoPedido.id">
          <q-list separator>
            <q-item-label header>Dados do Cliente</q-item-label>
            <q-item>
              <q-item-section>Nome</q-item-section>
              <q-item-section side
                >{{ detalhesDoPedido.billing.first_name }}
                {{ detalhesDoPedido.billing.last_name }}</q-item-section
              >
            </q-item>

            <q-item>
              <q-item-section>Telefone</q-item-section>
              <q-item-section side>{{ detalhesDoPedido.billing.phone }}</q-item-section>
            </q-item>

            <q-item>
              <q-item-section>Cidade - UF</q-item-section>
              <q-item-section side
                >{{ detalhesDoPedido.billing.city }} -
                {{ detalhesDoPedido.billing.state }}</q-item-section
              >
            </q-item>

            <q-item-label header>Dados do Pedido</q-item-label>

            <q-item>
              <q-item-section>Status</q-item-section>
              <q-item-section side>{{ detalhesDoPedido.status }}</q-item-section>
            </q-item>

            <q-item>
              <q-item-section>Data do Pedido</q-item-section>
              <q-item-section side>{{
                dataFormatada(detalhesDoPedido.date_created)
              }}</q-item-section>
            </q-item>

            <q-item>
              <q-item-section>CPF Nota</q-item-section>
              <q-item-section side>{{ detalhesDoPedido.billing.cpf_nota_fiscal }}</q-item-section>
            </q-item>

            <q-item>
              <q-item-section>Onde Aplicar a Vacina</q-item-section>
              <q-item-section side>{{
                detalhesDoPedido.billing.unidade_aplicar_vacina
              }}</q-item-section>
            </q-item>

            <q-item-label header>Produtos</q-item-label>

            <q-item :key="produto.id" v-for="produto in detalhesDoPedido.line_items">
              <q-item-section>{{ produto.quantity }}x {{ produto.name }}</q-item-section>
              <q-item-section side>{{ produto.total }}</q-item-section>
            </q-item>

            <q-item-label header>Notas do Pedido</q-item-label>

            <q-item :key="note.id" v-for="note in detalhesDoPedido.notes">
              <q-item-section>
                <span class="text-grey-6">{{ dataFormatada(note.date_created) }}</span>
                <div>{{ note.author }}: {{ note.note }}</div>
              </q-item-section>
            </q-item>
          </q-list>

          <q-btn
            class="full-width"
            label="Registrar Aplicação"
            no-caps
            color="secondary"
            @click="confirmVacinacao"
            :disable="
              detalhesDoPedido.status &&
                (detalhesDoPedido.status === 'completed' ||
                  detalhesDoPedido.status === 'cancelled' ||
                  detalhesDoPedido.status === 'refunded' ||
                  detalhesDoPedido.status === 'pending' ||
                  detalhesDoPedido.status === 'on-hold')
            "
          />
          <q-btn
            class="full-width q-mt-sm"
            label="Adicionar Nota Customizada"
            no-caps
            flat
            color="primary"
            @click="adicionarNotaCustomizada"
          />
          <q-btn
            class="full-width q-mt-sm"
            label="Concluir Pedido"
            no-caps
            flat
            color="negative"
            @click="confirmFinishOrder"
            :disable="
              detalhesDoPedido.status &&
                (detalhesDoPedido.status === 'completed' ||
                  detalhesDoPedido.status === 'cancelled' ||
                  detalhesDoPedido.status === 'refunded' ||
                  detalhesDoPedido.status === 'pending' ||
                  detalhesDoPedido.status === 'on-hold')
            "
          />
        </div>
      </div>
    </div>

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
import * as moment from 'moment';
import TextInput from 'components/TextInput';

const baseOrder = {
  billing: {},
};

export default {
  components: {
    TextInput,
  },

  data() {
    return {
      stars: 4,
      products: [],
      filter: {
        unidade: '',
        code: '',
      },
      unitySelection: false,
      detalhesDoPedido: JSON.parse(JSON.stringify(baseOrder)),
    };
  },

  mounted() {
    // this.loadProducts();
    const currentUnity = this.$store.getters['general/getCurrentUnity'];
    this.filter.unidade = currentUnity;

    if (!this.filter.unidade) {
      this.unitySelection = true;
    } else {
      // this.loadProducts();
    }
  },

  methods: {
    async criaNotaNoPedidoDaAplicacao() {
      this.$q.loading.show();
      try {
        await this.$axios
          .post('/order-note-vacination', {
            ...this.filter,
            orderId: this.detalhesDoPedido.id,
          })
          .then(r => r.data);
        this.$q.notify({
          message: 'Nota criada com sucesso',
          color: 'positive',
        });
        window.scrollTo({
          top: 100,
          left: 100,
          behavior: 'smooth',
        });
        this.getOrderInfo();
      } catch (error) {
        console.log(error);
        this.$q.notify({
          message: 'Erro ao criar a nota no PEDIDO',
          color: 'negative',
        });
      } finally {
        this.$q.loading.hide();
      }
    },
    confirmVacinacao() {
      if (confirm('Confirma a aplicação da(s) vacina(s)?')) {
        this.criaNotaNoPedidoDaAplicacao();
      }
    },
    async salvarNotaCustomizada(note) {
      this.$q.loading.show();
      try {
        await this.$axios
          .post('/order-note-vacination-custom', {
            ...this.filter,
            orderId: this.detalhesDoPedido.id,
            note,
          })
          .then(r => r.data);
        this.$q.notify({
          message: 'Nota criada com sucesso',
          color: 'positive',
        });
        window.scrollTo({
          top: 100,
          left: 100,
          behavior: 'smooth',
        });
        this.getOrderInfo();
      } catch (error) {
        console.log(error);
        this.$q.notify({
          message: 'Erro ao criar a nota',
          color: 'negative',
        });
      } finally {
        this.$q.loading.hide();
      }
    },
    async adicionarNotaCustomizada() {
      const nota = prompt('Digite a nota que deseja adicionar');
      if (nota) {
        this.salvarNotaCustomizada(nota);
      }
    },
    async finishOrder() {
      this.$q.loading.show();
      try {
        await this.$axios
          .post('/order-finish', {
            ...this.filter,
            orderId: this.detalhesDoPedido.id,
          })
          .then(r => r.data);
        this.$q.notify({
          message: 'Pedido concluído com sucesso',
          color: 'positive',
        });
        window.scrollTo({
          top: 100,
          left: 100,
          behavior: 'smooth',
        });
        this.getOrderInfo();
      } catch (error) {
        console.log(error);
        this.$q.notify({
          message: 'Erro ao criar a nota',
          color: 'negative',
        });
      } finally {
        this.$q.loading.hide();
      }
    },
    confirmFinishOrder() {
      if (confirm('Confirma quer deseja concluir o Pedido? Essa ação não poderá ser desfeita.')) {
        this.finishOrder();
      }
    },
    dataFormatada(date) {
      return moment(date).format('DD/MM/YYYY HH:mm');
    },
    async getOrderInfo() {
      if (!this.filter.unidade) {
        return this.$q.notify({
          message: 'Unidade obrigatória',
          color: 'negative',
        });
      } else if (!this.filter.code) {
        return this.$q.notify({
          message: 'Código do pedido obrigatório',
          color: 'negative',
        });
      }
      this.$q.loading.show();
      try {
        const order = await this.$axios
          .get('/order-info', {
            params: { ...this.filter },
          })
          .then(r => r.data)
          .catch(err => {
            console.log(err);
            this.$q.notify({
              message: 'Pedido não encontrado',
              color: 'negative',
            });
          });
        if (order) {
          this.detalhesDoPedido = { ...order };
        }
        console.log(order);
      } catch (error) {
        console.log(error);
        this.$q.notify({
          message: 'Erro ao recuperar as informações do Pedido',
          color: 'negative',
        });
      } finally {
        this.$q.loading.hide();
      }
    },
    setCurrentUnity(unity) {
      this.filter.unidade = unity;
      this.$store.dispatch('general/setCurrentUnity', unity);
      this.unitySelection = false;
    },
  },

  computed: {},
};
</script>
