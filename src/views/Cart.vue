<template>
  <div>
    <v-container>
      <h4>Корзина</h4>
      <v-layout class="mt-3" v-for="item in cart" :key="item.cartId">
        <v-img width="120px" :src="item.cartImageSrc" />
        <v-card-text>
          <h3>Название{{item.cartTitle}}</h3>
          <p>Описание{{item.cartDescription}}</p>
          <p>Цена:{{item.cartPrice}}</p>
          <p>Кол-вл{{item.cartQuantity}}</p>
        </v-card-text>
        <v-btn @click="removeFromCart">Удалить</v-btn>
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
  methods: {
    removeFromCart() {
      this.$store.dispatch("removeFromCart", this.item)
    }
  }
};
</script>

