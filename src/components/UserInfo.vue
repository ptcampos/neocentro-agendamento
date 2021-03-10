<template>
  <div class="row">
    <div class="col-xs-12" v-if="userState === 'off'">
      <SignInUser v-if="signState === 'signin'" @onClickSignUp="changeStateToSignUp" />
      <SignUpUser v-if="signState === 'signup'" @onClickSignIn="changeStateToSignIn" />
    </div>
    <div class="col-xs-12" v-if="userState === 'on'">
      <UserLogged />
    </div>
  </div>
</template>

<script>
import SignInUser from 'components/SignInUser';
import SignUpUser from 'components/SignUpUser';

export default {
  components: {
    SignInUser,
    SignUpUser,
  },

  data() {
    return {
      userState: 'off',
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
};
</script>

<style></style>
