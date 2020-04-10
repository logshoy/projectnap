<template>
  <v-container>
    <v-layout row>
      <v-flex xs12>
        <v-card v-if="!loading">
          <v-img :src="ad.imageSrc" height="300px"></v-img>
          <v-card-text>
            <h1 class="text--primary">{{ad.title}}</h1>
            <p>{{ad.description}}</p>
            <p>{{ad.price}}</p>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <add-to-cart v-if="isUserLoggedIn" :ad="ad"></add-to-cart>
            <app-buy-modal></app-buy-modal>
          </v-card-actions>
        </v-card>
        <div v-else class="text-xs-center">
          <v-progress-circular indeterminate :size="100" :width="4" color="purple"></v-progress-circular>
        </div>
      </v-flex>
    </v-layout>
    <comments :id="id"></comments>
  </v-container>
</template>

<script>
import Comments from "./Comments.vue";

export default {
  props: ["id"],
  computed: {
    ad() {
      const id = this.id;
      return this.$store.getters.adById(id);
    },
    loading() {
      return this.$store.getters.loading;
    },
    isUserLoggedIn() {
      return this.$store.getters.isUserLoggedIn;
    },
  },
  components: {
    Comments,
  }
};
</script>
