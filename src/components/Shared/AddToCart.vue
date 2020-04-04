<template>
  <v-dialog width="800px" v-model="modal">
    <template v-slot:activator="{ on }">
      <v-btn flat class="success mr-3" v-on="on" @click="addToCart">Add to Cart</v-btn>
    </template>
    <v-card>
      <v-container>
        <v-layout>
          <v-flex>
            <v-card-title>
              <h1>Корзина</h1>
            </v-card-title>
            <v-layout v-for="item in cart" :key="item.cartId" >
                <v-img
                  width="120px"
                  :src="item.cartImageSrc"
                />
                <v-card-text>
                  <h3>{{item.cartTitle}}</h3>
                  <p>{{item.cartDescription}}</p>
                  <p>{{item.cartPrice}}</p>
                </v-card-text>
                <v-btn>Удалить</v-btn>
            </v-layout>
            <v-layout>
              <v-spacer></v-spacer>
              <v-btn class="mr-3">Продолжить покупки</v-btn>
              <v-btn>В корзину</v-btn>
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
        cartQuantity: 1
      };
      this.$store.commit("addToCart", item);
    }
  }
};
</script>



<!-- Add "scoped" attribute to limit CSS to this component only -->
