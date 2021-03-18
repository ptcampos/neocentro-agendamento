<template>
  <div class="row">
    <div class="col-xs-12">
      <div class="text-h6">
        {{ loggedUser.first_name || loggedUser.firstName }}
        {{ loggedUser.last_name || loggedUser.lastName }}
      </div>
      <div class="text-body">{{ loggedUser.email }}</div>
      <p><span class="text-bold">Unidade: </span>{{ loggedUser.unidade }}</p>
      <q-btn
        label="Não é você? Clique aqui para acessar com outra conta"
        flat
        color="primary"
        dense
        no-caps
        @click="logoutUser"
      />
    </div>
  </div>
</template>

<script>
export default {
  mounted() {},

  methods: {
    logoutUser() {
      this.$store.dispatch('users/logoutUser');
      this.$root.$emit('onUpdateCurrentUser', null)
    },
  },

  computed: {
    loggedUser() {
      return this.$store.getters['users/loggedUser'];
    },
  },
};
</script>

<style></style>
