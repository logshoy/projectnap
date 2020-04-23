<template>
  <v-dialog width="500px" v-model="modal">
    <template v-slot:activator="{ on }">
      <v-btn v-if="isUserLoggedIn" class="primary" v-on="on">{{'Buy' | localize}}</v-btn>
      <v-btn v-else class="primary" to="/login">{{'Buy' | localize}}</v-btn>
    </template>
    <v-btn>chjgh</v-btn>
    <v-card>
      <v-container>
        <v-layout row>
          <v-flex xs12>
            <v-card-title>
              <h1 class="text--primary">{{'BuyIt' | localize}}</h1>
            </v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row>
          <v-flex xs12>
            <v-card-text>
              <v-text-field
                name="phone"
                :label="'YourPhone' | localize"
                type="text"
                v-model="phone"
              ></v-text-field>
            </v-card-text>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row>
          <v-flex xs12>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text @click="onCancel" :disabled="localLoading">{{'Close' | localize}}</v-btn>
              <v-btn
                class="success"
                text
                @click="onSave"
                :disabled="localLoading"
                :loading="localLoading"
              >{{'Buy' | localize}}!</v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["ad"],
  data() {
    return {
      modal: false,
      phone: "",
      localLoading: false
    };
  },
  computed: {
    isUserLoggedIn() {
      return this.$store.getters.isUserLoggedIn;
    }
  },
  methods: {
    onCancel() {
      this.phone = "";
      this.modal = false;
    },
    onSave() {
      if (this.phone !== "") {
        this.localLoading = true;
        this.$store
          .dispatch("createOrder", {
            phone: this.phone,
            adId: this.ad.id,
            ownerId: this.ad.ownerId
          })
          .finally(() => {
            this.phone = "";
            this.localLoading = false;
            this.modal = false;
          });
      }
    }
  }
};
</script>
