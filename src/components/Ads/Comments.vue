<template>
  <div class="mt-5">
    <v-container fluid>
      <h2>{{'SendReview' | localize}}</h2>
      <v-form v-model="valid" ref="form" validation class="text-center">
        <v-text-field
          :rules="titleRules"
          name="Title"
          :label="'Title' | localize "
          type="text"
          v-model="title"
        ></v-text-field>
        <v-textarea :rules="descriptionRules" :label="'Descriprion' | localize" v-model="text" outlined></v-textarea>
        <v-rating
          v-model="rating"
          value
          background-color="purple lighten-3"
          color="purple"
          size="64"
        ></v-rating>
        <v-btn 
          v-if="isUserLoggedIn"
          :disabled="!valid || !this.rating || loading || commentedItem"
          :loading="loading"
          @click="sendComment"
          class="error mt-3"
        >{{ "Send" | localize}}</v-btn>
        <v-btn v-else class="error mt-3" to="/login">{{'Login' |localize}}</v-btn>
      </v-form>
      <h2>{{ "SendReviews" | localize}}</h2>
      <div v-if="loading" class="text-xs-center">
        <v-progress-circular indeterminate :size="100" :width="4" color="purple"></v-progress-circular>
      </div>
      <div v-else-if="!loading && comments.length !== 0">
        <v-card v-for="item in comments.slice().reverse()" :key="item.key" class="mt-5">
          <v-layout>
            <v-col class="d-flex flex-column align-center pa-0" cols="4" sm="2">
              <v-avatar class="mt-4" :size="70">
                <img :src="item.imageSrc" />
              </v-avatar>
              <p class="avatar">{{item.nickname}}</p>
            </v-col>
            <v-col class="d-flex align-center pa-0" cols="8" sm="10">
              <v-card-title class="pa-0">
                <h3>{{item.title}}</h3>
              </v-card-title>
            </v-col>
          </v-layout>
          <v-layout>
            <v-spacer></v-spacer>
            <v-col class="pa-0" cols="12" sm="10">
              <v-card-text class="py-0 px-3">{{item.text}}</v-card-text>
            </v-col>
          </v-layout>
          <v-layout>
            <v-spacer></v-spacer>
            <v-col cols="12" sm="10">
              <v-row class="px-3">
                <div v-for="i in item.rating" :key="i">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    height="35px"
                    width="35px"
                    role="img"
                    aria-hidden="true"
                  >
                    <path
                      fill="#9c27b0"
                      d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"
                    />
                  </svg>
                </div>
              </v-row>
            </v-col>
          </v-layout>
          <v-layout>
            <v-spacer></v-spacer>
            <v-col class="py-0 mb-3" cols="12" sm="10">{{item.time}}</v-col>
          </v-layout>
        </v-card>
      </div>
      <v-flex xs12 class="text-xs-center" v-else>
        <h1 class="text--secondary">{{"FirstComments" | localize}}</h1>
      </v-flex>
    </v-container>
  </div>
</template>

<script>
export default {
  props: ["id"],
  data() {
    return {
      valid: false,
      title: "",
      text: "",
      now: new Date(),
      rating: "",
      titleRules: [
        v => !!v || "Заголовок is required",
        v =>
          (v && v.length <= 50) ||
          "Заголовок должен быть меньше чем 50 символов"
      ],
      descriptionRules: [
        v => !!v || "Заголовок is required",
        v =>
          (v && v.length <= 200) ||
          "Заголовок должен быть меньше чем 200 символов"
      ]
    };
  },
  computed: {
    comments() {
      return this.$store.getters.comments;
    },
    loading() {
      return this.$store.getters.loading;
    },
    commentedItem() {
      const id = this.id;
      return this.$store.getters.commentedItem(id)
    },
    isUserLoggedIn() {
      return this.$store.getters.isUserLoggedIn;
    },
  },
  mounted() {
    this.$store.dispatch("fetchComments", { adId: this.id });
  },
  beforeDestroy() {
    this.$store.commit("destroyComments");
  },
  methods: {
    sendComment() {
      this.$store.dispatch("createComments", {
        title: this.title,
        text: this.text,
        adId: this.id,
        time: this.now,
        rating: this.rating
      });
      this.$refs.form.reset();
    }
  }
};
</script>

<style >
.avatar {
  max-width: 150px;
  overflow-wrap: break-word;
}
</style>