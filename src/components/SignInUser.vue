<template>
  <q-form @submit="onSubmit">
    <div class="row q-col-gutter-md">
      <div class="offset-sm-2 col-sm-8 col-xs-12">
        <div class="text-h6">Já possui uma conta?</div>
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
        <q-btn
          type="submit"
          icon="eva-lock-outline"
          class="full-width"
          color="primary"
          label="Acessar"
          no-caps
        />
        <div class="row q-col-gutter-sm">
          <div class="col-xs-12 col-sm-6">
            <q-btn
              class="full-width"
              @click="$emit('onClickSignUp')"
              color="secondary"
              label="Cadastre-se"
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
  </q-form>
</template>

<script>
import TextInput from 'components/TextInput';
import SelectInput from 'components/SelectInput';

export default {
  data() {
    return {
      auth: {
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
    onSubmit() {},
  },
};
</script>

<style></style>
