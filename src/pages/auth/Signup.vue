<template>
  <q-page padding>
    <div class="row items-center justify-center wrapper">
      <div class="wrapper-auth">
        <q-form @submit="authUser">
          <div class="row q-col-gutter-md">
            <div class="offset-sm-2 col-sm-8 col-xs-12">
              <div class="text-h6">Acessar</div>
            </div>
            <div class="offset-sm-2 col-sm-8 col-xs-12">
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
            <div class="offset-sm-2 col-sm-8 col-xs-12">
              <TextInput type="email" label="E-mail" v-model="auth.email" />
            </div>
            <div class="offset-sm-2 col-sm-8 col-xs-12">
              <TextInput type="password" label="Senha" v-model="auth.password" />
            </div>
            <div class="offset-sm-2 col-sm-8 col-xs-12">
              <q-btn type="submit" class="full-width" color="primary" label="Acessar" no-caps />
              <q-btn class="full-width" color="primary" label="Esqueceu a Senha" no-caps flat />
            </div>
          </div>
        </q-form>
      </div>
    </div>
  </q-page>
</template>

<script>
import TextInput from 'components/TextInput';
import SelectInput from 'components/SelectInput';

export default {
  components: {
    TextInput,
    SelectInput,
  },

  data() {
    return {
      auth: {
        unidade: '',
        email: '',
        password: '',
      },
    };
  },

  methods: {
    authUser() {},
  },
};
</script>

<style></style>
