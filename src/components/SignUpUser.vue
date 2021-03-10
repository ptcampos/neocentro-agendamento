<template>
  <q-form @submit="onSubmit">
    <div class="row">
      <div class="offset-sm-2 col-sm-8 col-xs-12">
        <div class="row q-col-gutter-md">
          <div class="col-sm-8 col-xs-12">
            <div class="text-h6">Criar conta</div>
          </div>
          <div class="col-sm-12 col-xs-12">
            <SelectInput
              label="Unidade"
              v-model="auth.unidade"
              :options="[
                { label: 'Brasília', value: 'brasilia' },
                { label: 'Curitiba', value: 'curitiba' },
                { label: 'Uberlândia', value: 'uberlandia' },
                { label: 'Valparaiso', value: 'valparaiso' },
              ]"
              :required="true"
            />
          </div>
          <div class="col-sm-6 col-xs-12">
            <TextInput
              label="Nome"
              placeholder="Nome do Responsável"
              v-model="auth.first_name"
              @input="updateUserName"
              :required="true"
            />
          </div>
          <div class="col-sm-6 col-xs-12">
            <TextInput
              label="Sobrenome"
              placeholder="Sobrenome do Responsável"
              v-model="auth.last_name"
              @input="updateUserName"
              :required="true"
            />
          </div>
          <div class="col-xs-12">
            <TextInput
              label="Telefone Celular"
              placeholder="Telefone Para Contato"
              v-model="auth.billing.phone"
              mask="(##) #####-####"
              :required="true"
            />
          </div>
          <div class="col-sm-12 col-xs-12">
            <TextInput
              type="email"
              label="E-mail"
              @input="val => (auth.billing.email = val)"
              v-model="auth.email"
              :required="true"
            />
          </div>
          <div class="col-sm-12 col-xs-12">
            <TextInput type="password" label="Senha" v-model="auth.password" :required="true" />
          </div>
          <div class="col-sm-12 col-xs-12">
            <TextInput
              type="password"
              label="Confirmar Senha"
              v-model="auth.confirmPassword"
              :required="true"
              :aditionalRules="[val => !!(val === auth.password) || 'Senhas não conferem']"
            />
          </div>
          <div class="col-sm-12 col-xs-12">
            <q-btn
              type="submit"
              icon="eva-lock-outline"
              class="full-width"
              color="primary"
              label="Cadastrar-se"
              no-caps
            />
            <div class="row q-col-gutter-sm">
              <div class="col-xs-12 col-sm-6">
                <q-btn
                  class="full-width"
                  @click="$emit('onClickSignIn')"
                  color="secondary"
                  label="Possui uma Conta?"
                  no-caps
                  flat
                />
              </div>
              <div class="col-xs-12 col-sm-6">
                <q-btn
                  class="full-width"
                  :disable="true"
                  color="secondary"
                  label="Esqueceu a Senha"
                  no-caps
                  flat
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-form>
</template>

<script>
import * as _ from 'lodash';

import TextInput from 'components/TextInput';
import SelectInput from 'components/SelectInput';

export default {
  data() {
    return {
      auth: {
        first_name: '',
        last_name: '',
        username: '',
        billing: {
          first_name: '',
          last_name: '',
          company: '',
          address_1: '',
          address_2: '',
          city: '',
          state: '',
          postcode: '',
          country: '',
          email: '',
          phone: '',
        },
        shipping: {
          first_name: '',
          last_name: '',
          company: '',
          address_1: '',
          address_2: '',
          city: '',
          state: '',
          postcode: '',
          country: '',
        },
        unidade: '',
        email: '',
        password: '',
      },
    };
  },

  components: {
    TextInput,
    SelectInput,
  },

  methods: {
    async onSubmit() {
      this.$q.loading.show();
      try {
        // create user
        // sigin
        // set user
      } catch (error) {
        console.log(error);
        this.$q.notify({
          message: 'Erro ao criar a sua conta. Tente novamente mais tarde.',
          color: 'negative',
        });
      } finally {
        this.$q.loading.hide();
      }
    },
    updateUserName() {
      this.auth.username = `${_.kebabCase(this.auth.first_name)}-${_.kebabCase(
        this.auth.last_name,
      )}`;
    },
  },
};
</script>

<style></style>
