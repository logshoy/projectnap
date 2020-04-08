<template>
  <div class="mt-5">
    <v-container fluid>
      <h2>Отравить отзыв</h2>
      
      <v-form class="text-center">
        <v-text-field name="Title" label="Заголовок" type="text" v-model="title"></v-text-field>
        <v-textarea v-model="text" outlined></v-textarea>
        <v-rating v-model="rating" background-color="purple lighten-3" color="purple" size="64"></v-rating>
        <v-btn @click="sendComment" class="error">Отправить</v-btn>
      </v-form>

      <div v-if="!loading && comments.length !== 0">
        <v-card v-for="item in comments.slice().reverse()" :key="item" class="mt-5 d-flex">
          <v-col md="1">
            <v-avatar class="mt-4" size="76px">
              <img src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460" />
            </v-avatar>
          </v-col>
          <v-col md="11">
            <v-row>
              <v-card-title>{{item.title}}</v-card-title>
              <v-spacer></v-spacer>
              <span style="display: flex; align-items:center; margin-right:10px">{{item.time}}</span>
              <v-rating size="38"></v-rating>
            </v-row>
            <v-card-text>{{item.text}}</v-card-text>
          </v-col>
        </v-card>
      </div>
      <v-flex xs12 class="text-xs-center" v-else>
        <h1 class="text--secondary">У вас нет заказов</h1>
      </v-flex>
    </v-container>
  </div>
</template>

<script>
export default {
  props: ["id"],
  data() {
    return {
      rating: "",
      title: "",
      text: "",
      now: new Date()
    };
  },
  computed: {
    comments() {
      return this.$store.getters.comments;
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
          time: this.now
        })
        .finally(() => {
          this.title = "";
          this.text = "";
        });
    }
  }
};
</script>
