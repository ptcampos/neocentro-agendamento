<template>
  <div class="row">
    <div class="col-xs-12" v-if="!loggedUser">
      <SignInUser v-if="signState === 'signin'" @onClickSignUp="changeStateToSignUp" />
      <SignUpUser v-if="signState === 'signup'" @onClickSignIn="changeStateToSignIn" />
    </div>
    <div class="col-xs-12" v-if="loggedUser">
      <UserLogged />
    </div>
  </div>
</template>

<script>
import SignInUser from 'components/SignInUser';
import SignUpUser from 'components/SignUpUser';
import UserLogged from 'components/UserLogged';

export default {
  components: {
    SignInUser,
    SignUpUser,
    UserLogged,
  },

  data() {
    return {
      signState: 'signin',
    };
  },

  methods: {
    changeStateToSignUp() {
      this.signState = 'signup';
    },
    changeStateToSignIn() {
      this.signState = 'signin';
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
