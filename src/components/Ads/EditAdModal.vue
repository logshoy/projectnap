<template>
  <v-dialog width="400px" v-model="modal">
    <template v-slot:activator="{ on }">
      <v-btn class="warning mr-1" v-on="on">{{'Change' | localize}}</v-btn>
    </template>
    <v-card>
      <v-container>
        <v-layout row>
          <v-flex xs12>
            <v-card-title>
              <h1 class="text--primary">{{'ChangeAd' | localize}}</h1>
            </v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row>
          <v-flex xs12>
            <v-card-text>
              <v-text-field
                name="title"
                :label="'Title' | localize"
                type="text"
                v-model="editedTitle"
              ></v-text-field>
              <v-text-field
                name="description"
                :label="'Descriprion' | localize"
                type="text"
                multi-line
                v-model="editedDescription"
              ></v-text-field>
              <v-text-field
                name="price"
                :label="'Price' | localize"
                type="number"
                v-model="editedPrice"
              ></v-text-field>
            </v-card-text>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row>
          <v-flex xs12>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text @click="onCancel">{{'Close' | localize}}</v-btn>
              <v-btn class="success" text @click="onSave">{{'Save' | localize}}</v-btn>
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
      editedDescription: this.ad.description,
      editedTitle: this.ad.title,
      editedPrice: this.ad.price
    };
  },
  methods: {
    onCancel() {
      this.editedDescription = this.ad.description;
      this.editedTitle = this.ad.title;
      this.editedPrice = this.ad.price;
      this.modal = false;
    },
    onSave() {
      if (
        this.editedDescription !== "" &&
        this.editedTitle !== "" &&
        this.editedPrice !== ""
      ) {
        this.$store.dispatch("updateAd", {
          title: this.editedTitle,
          description: this.editedDescription,
          price: this.editedPrice,
          id: this.ad.id
        });

        this.modal = false;
      }
    }
  }
};
</script>
