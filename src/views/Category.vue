<template>
  <div>
    <v-container grid-list-lg>
      <h1>Категория {{category}}</h1>
      <v-menu>
        <template v-slot:activator="{ on }">
          <v-btn color="primary" v-on="on" depressed>Сортировка</v-btn>
        </template>
        <v-list color="primary">
          <v-list-item v-for="item in items" :key="item">
            <v-btn @click="select(index)" depressed color="primary">{{item}}</v-btn>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-layout>
        <v-col cols="4" sm="6" md="3">
          <v-text-field prepend-inner-icon="mdi-lock" label="Regular" v-model="search"></v-text-field>
        </v-col>
        <v-col cols="4" class="mt-3">
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
        <v-flex xs12 sm6 md4 v-for="ad of  visiblePages" :key="ad.id">
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
        <v-pagination
          :total-visible="5"
          v-model="page"
          :length="Math.ceil(this.filteredItems.length/perPage)"
          circle
        ></v-pagination>
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
      perPage: 6,
      search: "",
      searchItem: [],
      items: [
        "Cost (Low to Higt)",
        "Cost(High to Low)",
        "Name(A-Z)",
        "Name(Z-A)"
      ],
      min: 0,
      max: 1000000,
      range: [0, 1000000]
    };
  },
  computed: {
    isUserLoggedIn() {
      return this.$store.getters.isUserLoggedIn;
    },
    categoryAds() {
      const category = this.category;
      return this.$store.getters.categoryAds(category);
    },
    visiblePages() {
      return this.filteredItems
        .slice()
        .reverse()
        .slice((this.page - 1) * this.perPage, this.page * this.perPage);
    },
    filteredItems() {
      return this.categoryAds.filter(item => {
        return (
          (item.title.toLowerCase().match(this.search.toLowerCase()) ||
          item.description.toLowerCase().match(this.search.toLowerCase())) &&
          (item.price >= this.range[0] && item.price <= this.range[1])
        );
      });
    },
    filtersPrice() {
      return this.categoryAds.filter(item => {
        return item.price >= this.range[0] && item.price <= this.range[1];
      });
    }
  },
  methods: {
    select(index) {
      if (index === 0) {
        let query = Object.assign({}, this.$route.query);
        delete query.sort;

        this.$router.push({ query: query });
      } else {
        let query = Object.assign({}, this.$route.query);
        query.sort = index;
        this.$router.push({ query: query });
      }
    }
  }
};
</script>