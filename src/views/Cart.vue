<template>
  <div>
    <v-container>
      <h4>Корзина</h4>
      <v-layout wrap class="mt-3" v-for="item in cart" :key="item.cartId">
        <v-col cols="4" md="2">
        <v-img width="150px" :src="item.cartImageSrc" />
        </v-col>
        <v-col cols="8" md="9">
        <v-card-text>
          <h3>Название:{{item.cartTitle}}</h3>
          <p>Описание:{{item.cartDescription}}</p>
          <p>Цена:{{item.cartPrice}}P</p>
          <p>Количество:{{item.cartQuantity}}</p>
        </v-card-text>
        </v-col>
        <v-col cols="12" md="1">
        <v-btn 
        @click="$store.dispatch('removeFromCart', item)"
        >Удалить</v-btn>
        </v-col>
      </v-layout>
      Total Price : {{ totalPrice }}
    </v-container>
  </div>
</template>

<script>
export default {
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

