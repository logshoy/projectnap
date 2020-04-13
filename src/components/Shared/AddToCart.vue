<template>
  <v-dialog width="800px" v-model="modal">
    <template v-slot:activator="{ on }">
      <v-btn text class="success mr-3" v-on="on" @click="addToCart">Add to Cart</v-btn>
    </template>
    <v-card>
      <v-container>
        <v-layout>
          <v-flex>
            <v-card-title>
              <h1>Корзина</h1>
            </v-card-title>
            <v-layout class="mt-3" v-for="item in cart" :key="item.cartId" >
                <v-img
                  width="120px"
                  :src="item.cartImageSrc"
                />
                <v-card-text>
                  <h3>Название{{item.cartTitle}}</h3>
                  <p>Описание{{item.cartDescription}}</p>
                  <p>Цена:{{item.cartPrice}}</p>
                  <p>Кол-вл{{item.cartQuantity}}</p>
                </v-card-text>
                <v-btn @click="removeFromCart">Удалить</v-btn>
            </v-layout>
            <v-layout>
              <v-spacer></v-spacer>
              <v-btn class="mr-3">Продолжить покупки</v-btn>
              <v-btn to="/cart">В корзину</v-btn>
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
        }
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
        cartQuantity: 1
      };
      this.$store.dispatch("addToCart", item);
    },
    removeFromCart() {
      this.$store.dispatch("removeFromCart", this.item)
    }

  }
};
</script>
