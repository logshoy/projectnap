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
            <h3>{{'Title' | localize}}: {{item.cartTitle}}</h3>
            <p>{{'Descriprion' | localize}}: {{item.cartDescription}}</p>
            <p>{{'Price' | localize}}: {{item.cartPrice}} ₽</p>
            <p>{{'Amount' | localize}}: {{item.cartQuantity}}</p>
          </v-card-text>
        </v-col>
        <v-col cols="12" md="1">
          <v-btn @click="$store.dispatch('removeFromCart', item)">{{'Delete'|localize}}</v-btn>
        </v-col>
      </v-layout>
      <v-layout class="d-flex align-center">
        <div>{{'TotalPrice'| localize}} : {{ totalPrice }} ₽</div>
        <v-btn class="error ml-3" @click.stop="dialog = true">{{'Buy' | localize}}</v-btn>
      </v-layout>
      <v-dialog v-model="dialog" width="500px">
        <v-card>
          <v-container>
            <v-card-title>Введите номер телефона</v-card-title>
            <v-layout row>
              <v-flex xs12>
                <v-card-text>
                  <v-text-field
                    name="phone"
                    :label="'YourPhone' | localize"
                    type="phone"
                    v-model="phone"
                    required
                    :rules="[v => !!v || 'Phone is required']"
                  ></v-text-field>
                </v-card-text>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs12>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn text @click="onCancel" :disabled="localLoading">{{'Close' | localize}}</v-btn>
                  <v-btn class="success" text @click="buyAll">{{'Buy' | localize}}!</v-btn>
                </v-card-actions>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-dialog>
    </v-container>
  </div>
</template>

<script>
export default {
  metaInfo() {
    return {
      title: this.$title("Basket")
    };
  },
  data() {
    return {
      dialog: false,
      phone: ""
    };
  },
  computed: {
    cart() {
      return this.$store.getters.cart;
    },
    totalPrice() {
      return this.$store.getters.totalPrice;
    }
  },
  methods: {
    onCancel() {
      this.phone = "";
      this.dialog = false;
    },
    buyAll() {
      if (this.phone !== "") {
        this.$store
          .dispatch("createOrderAll", {
            cart: this.cart,
            phone: this.phone
          })
          .finally(() => {
            this.phone = "";
            this.dialog = false;
          });
      }
    }
  }
};
</script>

