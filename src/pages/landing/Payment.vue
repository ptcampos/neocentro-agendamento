<template>
  <div class="row q-col-gutter-md">
    <div class="col-xs-12 bg-grey-1 q-pb-md shadow-1">
      <UserInfo />
    </div>
    <div class="col-xs-12">
      <q-separator dark />
    </div>
    <div class="col-xs-12 shadow-1">
      <div class="text-body text-grey-8">Vacinas:</div>
      <CartProducts />
    </div>
    <div class="col-xs-12">
      <q-separator dark />
    </div>
    <div class="col-xs-12 bg-grey-1 q-pb-md shadow-1">
      <PaymentCard />
    </div>
  </div>
</template>

<script>
import UserInfo from 'components/UserInfo';
import CartProducts from 'components/CartProducts';
import PaymentCard from 'components/PaymentCard';

export default {
  components: {
    UserInfo,
    CartProducts,
    PaymentCard,
  },
};
</script>

<style></style>
