<template>
  <v-dialog width="800px" v-model="modal">
    <template v-slot:activator="{ on }">
      <v-btn text class="success mr-3" v-on="on" @click="addToCart">{{'Basket' | localize}}</v-btn>
    </template>
    <v-card>
      <v-container>
        <v-layout>
          <v-flex>
            <v-card-title>
              <h1>{{'Basket' | localize}}</h1>
            </v-card-title>
            <v-layout class="mt-3" v-for="item in cart" :key="item.cartId">
              <v-img width="120px" :src="item.cartImageSrc" />
              <v-card-text>
                <h3>{{'Title' | localize}}:{{ item.cartTitle }}</h3>
                <p>{{'Descriprion' | localize}}:{{ item.cartDescription }}</p>
                <p>{{'Price' | localize}}:{{ item.cartPrice }}</p>
                <p>{{'Amount' | localize}}{{ item.cartQuantity }}</p>
              </v-card-text>
              <v-btn @click="$store.dispatch('removeFromCart', item)">{{'Delete' | localize}}</v-btn>
            </v-layout>
            <v-layout class="mt-3">
              <v-spacer></v-spacer>
              <v-btn class="mr-3" @click="modal = false">{{'ContinueShopping' | localize}}</v-btn>
              <v-btn to="/cart">{{'Basket' | localize}}</v-btn>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "add-to-cart",
  props: ["ad"],
  data() {
    return {
      modal: false
    };
  },
  computed: {
    cart() {
      return this.$store.getters.cart;
    }
  },
  methods: {
    addToCart() {
      const item = {
        cartTitle: this.ad.title,
        cartDescription: this.ad.description,
        cartImageSrc: this.ad.imageSrc,
        cartPrice: this.ad.price,
        cartId: this.ad.id,
        cartOwner: this.ad.ownerId,
        cartQuantity: 1
      };
      this.$store.dispatch("addToCart", item);
    }
  }
};
</script>
