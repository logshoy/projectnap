<template>
  <div v-if="!loading">
    <v-container fluid>
      <v-layout row>
        <v-flex xs12>
          <v-carousel>
            <v-carousel-item v-for="ad in promoAds" :key="ad.id" :src="ad.imageSrc">
              <div class="car-link">
                <v-btn class="error" :to="'/ad/' + ad.id">{{ ad.title }}</v-btn>
              </div>
            </v-carousel-item>
          </v-carousel>
        </v-flex>
      </v-layout>
    </v-container>
        <v-container >
      <v-layout row>
        <v-flex xs12>
          <div class="tizer">
            <v-col cols="12" sm="6" md="3">
				<div class="tizer__item">
					<div class="tizer__img">
						<img src="product.png" alt="Продукт">
					</div>
					<div class="tizer__title">
						Товары по ценам производителя
					</div>
				</div>
        </v-col >
          <v-col cols="12" sm="6"  md="3">
				<div class="tizer__item">
					<div class="tizer__img">
						<img src="certificate.png" alt="Продукт">
					</div>
					<div class="tizer__title">
						Только сертифицированный товар
					</div>
				</div>
        </v-col>
        <v-col cols="12" sm="6"  md="3">
				<div class="tizer__item">
					<div class="tizer__img">
						<img src="instruments.png" alt="Продукт">
					</div>
					<div class="tizer__title">
						Профессиональный подбор оборудования
					</div>
				</div>
        </v-col>
        <v-col cols="12" sm="6"  md="3">
				<div class="tizer__item">
					<div class="tizer__img">
						<img src="delivery.png" alt="Продукт">
					</div>
					<div class="tizer__title">
						Бесплатная и быстрая доставка
					</div>
				</div>
        </v-col>
			</div>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container grid-list-lg>
      <v-layout row wrap>
        <v-flex
          xs12
          sm6
          lg4
          v-for="ad of ads
            .slice()
            .reverse()
            .slice(0, 6)"
          :key="ad.id"
        >
          <v-card>
            <v-img class="card-img d-flex align-self-center" :src="ad.imageSrc" height="200px" width="100px" ></v-img>
            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">{{ ad.title }}</h3>
                <div>{{ ad.description }}</div>
                <div>{{ ad.price }} P</div>
                <div>{{ "Rating" | localize }}: {{ ad.rating }}</div>
              </div>
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn :to="'/ad/' + ad.id" class="mr-3">
                {{
                "Open" | localize
                }}
              </v-btn>
              <add-to-cart v-if="isUserLoggedIn" :ad="ad"></add-to-cart>
              <app-buy-modal :ad="ad"></app-buy-modal>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
  <div v-else>
    <v-container>
      <v-layout row>
        <v-flex xs12 class="text-center pt-5">
          <v-progress-circular indeterminate :size="100" :width="4" color="purple"></v-progress-circular>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  metaInfo() {
    return {
      title: this.$title("Home")
    };
  },
  computed: {
    promoAds() {
      return this.$store.getters.promoAds;
    },
    ads() {
      return this.$store.getters.ads;
    },
    loading() {
      return this.$store.getters.loading;
    },
    isUserLoggedIn() {
      return this.$store.getters.isUserLoggedIn;
    }
  }
};
</script>

<style scoped>
.car-link {
  position: absolute;
  bottom: 50px;
  left: 50%;
  background: rgba(0, 0, 0, 0.5);
  transform: translate(-50%, 0);
  padding: 5px 15px;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
}

.card-img {
  margin: 0 auto;
}

.tizer {
  padding: 0 20px;
  margin: 10px 0;
  display: flex;
  flex-wrap: wrap;
  min-height: 120px;
}

.tizer__item {
  display: flex;
  align-items: center;
  width: 25%;
}

.tizer__img {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 20px 0 0;
  background: #fff;
  border-radius: 100%;
  width: 80px;
  height: 80px;
  min-width: 80px;
}

</style>
