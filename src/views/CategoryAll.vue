<template>
  <div>
    <v-container grid-list-lg>
      <h1>{{'Catalog' | localize}}</h1>
      <v-layout row wrap>
        <v-col v-for="cat in categoryList" :key="cat">
          <v-btn class="primary" :to="/category/ + cat">{{ cat }}</v-btn>
        </v-col>
      </v-layout>
      <v-layout row wrap>
        <v-col cols="12" md="4">
          <v-select :label="'Sorting' | localize" :items="items" v-model="sorting"></v-select>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field prepend-inner-icon="mdi-lock" :label="'Search' | localize" v-model="search"></v-text-field>
        </v-col>
        <v-col cols="12" md="4" class="mt-3">
          <v-range-slider
            v-model="range"
            step="100"
            :max="max"
            :min="min"
            hide-details
            class="align-center"
          >
            <template v-slot:prepend>
              <v-text-field
                :value="range[0]"
                class="mt-0 pt-0"
                hide-details
                single-line
                type="number"
                style="width: 60px"
                @change="$set(range, 0, $event)"
              ></v-text-field>
            </template>
            <template v-slot:append>
              <v-text-field
                :value="range[1]"
                class="mt-0 pt-0"
                hide-details
                single-line
                type="number"
                style="width: 60px"
                @change="$set(range, 1, $event)"
              ></v-text-field>
            </template>
          </v-range-slider>
        </v-col>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs12 sm6 md4 v-for="ad of visiblePages" :key="ad.id">
          <v-card>
            <v-img :src="ad.imageSrc" height="200px"></v-img>
            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">{{ ad.title }}</h3>
                <div>{{ ad.description }}</div>
                <div>{{ad.price}} ₽</div>
                <div>{{'Rating' | localize}}:{{ad.rating}}</div>
              </div>
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn :to="'/ad/' + ad.id" class="mr-3">{{'Open' | localize}}</v-btn>
              <add-to-cart v-if="isUserLoggedIn" :ad="ad"></add-to-cart>
              <app-buy-modal :ad="ad"></app-buy-modal>
            </v-card-actions>
          </v-card>
        </v-flex>
        <v-pagination
          :total-visible="5"
          v-model="page"
          :length="Math.ceil(this.filteredItems.length / perPage)"
          circle
        ></v-pagination>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
export default {
  metaInfo() {
    return {
      title: this.$title("Catalog")
    };
  },
  data() {
    return {
      page: 1,
      perPage: 6,
      search: "",
      searchItem: [],
      sorting: "По дате",
      items: [
        "По дате",
        "Cost (Low to Higt)",
        "Cost(High to Low)",
        "Name(A-Z)",
        "Name(Z-A)",
        "Rating 0-5",
        "Rating 5-0"
      ],
      min: 0,
      max: 10000,
      range: [0, 10000]
    };
  },
  computed: {
    isUserLoggedIn() {
      return this.$store.getters.isUserLoggedIn;
    },
    ads() {
      return this.$store.getters.ads;
    },
    categoryList() {
      return this.$store.getters.category;
    },
    visiblePages() {
      return this.filteredItems
        .slice()
        .reverse()
        .slice((this.page - 1) * this.perPage, this.page * this.perPage);
    },
    filteredItems() {
      let filteredStates = this.ads.filter(item => {
        return (
          (item.title.toLowerCase().match(this.search.toLowerCase()) ||
            item.description.toLowerCase().match(this.search.toLowerCase())) &&
          item.price >= this.range[0] &&
          item.price <= this.range[1]
        );
      });
      if (this.sorting == "Cost(High to Low)") {
        filteredStates = filteredStates.sort(
          (prev, curr) => prev.price - curr.price
        );
      }
      if (this.sorting == "Cost (Low to Higt)") {
        filteredStates = filteredStates.sort(
          (prev, curr) => curr.price - prev.price
        );
      }
      if (this.sorting == "Name(A-Z)") {
        filteredStates = filteredStates.sort((a, b) => {
          var nameA = a.title.toLowerCase(),
            nameB = b.title.toLowerCase();
          if (nameA < nameB) return 1;
          if (nameA > nameB) return -1;
          return 0;
        });
      }
      if (this.sorting == "Name(Z-A)") {
        filteredStates = filteredStates.sort((a, b) => {
          var nameA = a.title.toLowerCase(),
            nameB = b.title.toLowerCase();
          if (nameA < nameB) return -1;
          if (nameA > nameB) return 1;
          return 0;
        });
      }
      if (this.sorting == "Rating 5-0") {
        filteredStates = filteredStates.sort(
          (prev, curr) => prev.rating - curr.rating
        );
      }
      if (this.sorting == "Rating 0-5") {
        filteredStates = filteredStates.sort(
          (prev, curr) => curr.rating - prev.rating
        );
      }
      return filteredStates;
    }
  }
};
</script>
