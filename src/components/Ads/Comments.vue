<template>
  <div class="mt-5">
    <v-container fluid>
      <h2>Отравить отзыв</h2>
      <v-form v-model="valid" ref="form" validation class="text-center">
        <v-text-field 
        :rules="[v => !!v || 'Заголовок is required']" 
          name="Title" label="Заголовок" type="text" v-model="title"></v-text-field>
        <v-textarea :rules="[v => !!v || 'Текст is required']"
          label="Text" v-model="text" outlined></v-textarea>
        <v-rating 
           v-model="rating" background-color="purple lighten-3" color="purple" size="64">
        </v-rating>
        <v-btn 
        :disabled="!valid || !this.rating || loading"
        :loading="loading"
        @click="sendComment" 
        class="error"
        >Отправить</v-btn>
      </v-form>
      <h2>Отправленые отзывы</h2>
      <div v-if="loading" class="text-xs-center">
          <v-progress-circular indeterminate :size="100" :width="4" color="purple"></v-progress-circular>
      </div>
      <div v-else-if="!loading && comments.length !== 0">
        <v-card v-for="item in comments.slice().reverse()" :key="item.key" class="mt-5 d-flex">
          <v-col md="2">
            <v-avatar class="mt-4" size="76px">
              <img :src="item.imageSrc" />
            </v-avatar>
            <div>{{item.nickname}}</div>
          </v-col>
          <v-col md="10">
            <v-row>
              <v-card-title>
                <h3>{{item.title}}</h3>
              </v-card-title>
              <v-spacer></v-spacer>
              <span style="display: flex; align-items:center; margin-right:10px">{{item.time}}</span>
            </v-row>
            <v-card-text>{{item.text}}</v-card-text>
            <v-row>
              <div class="d-flex" v-for="i in item.rating" :key="i">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  height="64px"
                  width="64px"
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
        </v-card>
      </div>
      <v-flex xs12 class="text-xs-center" v-else>
        <h1 class="text--secondary">Нет комментариев, станьте первым!</h1>
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
      rating: ""
    };
  },
  computed: {
    comments() {
      return this.$store.getters.comments;
    },
    loading() {
      return this.$store.getters.loading;
    }
  },
  mounted() {
    this.$store.dispatch("fetchComments", { adId: this.id });
  },
  beforeDestroy() {
    this.$store.commit("destroyComments");
  },
  methods: {
    sendComment() {
      this.$store
        .dispatch("createComments", {
          title: this.title,
          text: this.text,
          adId: this.id,
          time: this.now,
          rating: this.rating
        })
        .finally(() => {
          this.title = "";
          this.text = "";
          this.rating = "";
        });
      this.$store.dispatch("fetchComments", { adId: this.id });
    }
  }
};
</script>
