<template>
  <div>
    <v-container>
      <h4>{{'Basket' | localize}}</h4>
      <v-layout wrap class="mt-3" v-for="item in cart" :key="item.cartId">
        <v-col cols="4" md="2">
        <v-img width="150px" :src="item.cartImageSrc" />
        </v-col>
        <v-col cols="8" md="9">
        <v-card-text>
          <h3>{{'Title' | localize}}:{{item.cartTitle}}</h3>
          <p>{{'Descriprion' | localize}}:{{item.cartDescription}}</p>
          <p>{{'Price' | localize}}:{{item.cartPrice}}P</p>
          <p>{{'Amount' | localize}}:{{item.cartQuantity}}</p>
        </v-card-text>
        </v-col>
        <v-col cols="12" md="1">
        <v-btn 
        @click="$store.dispatch('removeFromCart', item)"
        >{{'Delete'|localize}}</v-btn>
        </v-col>
      </v-layout>
      {{'TotalPrice'| localize}} : {{ totalPrice }}
    </v-container>
  </div>
</template>

<script>
export default {
  metaInfo() {
    return {
      title: this.$title('Basket')
    }
  },
  computed: {
    cart() {
      return this.$store.getters.cart;
    },
    totalPrice() {
      return this.$store.getters.totalPrice;
    }
  },
};
</script>

