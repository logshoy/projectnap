<template>
  <div>
    <v-container grid-list-lg>
      <h1>Категория</h1>
      <h2>{{category}}</h2>
      <v-layout row wrap :pagination.sync="pagination">
        <v-flex xs12 sm6 md4 v-for="ad of visiblePages" :key="ad.id">
          <v-card>
            <v-img :src="ad.imageSrc" height="200px"></v-img>
            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">{{ad.title}}</h3>
                <div>{{ad.description}}</div>
                <div>{{ad.price}}</div>
              </div>
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn :to="'/ad/' + ad.id" class="mr-3">Открыть</v-btn>
              <add-to-cart v-if="isUserLoggedIn" :ad="ad"></add-to-cart>
              <app-buy-modal :ad="ad"></app-buy-modal>
            </v-card-actions>
          </v-card>
        </v-flex>
        <v-pagination v-model="page" :length="Math.ceil(this.categoryAds.length/perPage)" circle></v-pagination>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
export default {
  props: ["category"],
  data() {
    return {
      page: 1,
      perPage: 6
    };
  },
  computed: {
    categoryAds() {
      const category = this.category;
      return this.$store.getters.categoryAds(category);
    },
    visiblePages () {
      return this.categoryAds.slice((this.page - 1)* this.perPage, this.page* this.perPage)
    }
  }
};
</script>