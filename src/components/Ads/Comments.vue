<template>
  <div class="mt-5">
    <v-container fluid>
      <h2>Отравить отзыв</h2>
      <v-form class="text-center">
        <v-text-field
          name="Title"
          label="Заголовок"
          type="text"
          v-model="title"
        ></v-text-field>
        <v-textarea v-model="text" outlined></v-textarea>
        <v-rating
          v-model="rating"
          background-color="purple lighten-3"
          color="purple"
          size="64"
        ></v-rating>
        <v-btn @click="sendComment" class="error">Отправить</v-btn>
      </v-form>
      <v-card class="mt-5 d-flex">
        <v-col md="1">
          <v-avatar class="mt-4" size="76px">
            <img
              src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
            />
          </v-avatar>
        </v-col>
        <v-col md="11">
          <v-row>
            <v-card-title> Автор чорт </v-card-title>
            <v-spacer></v-spacer>
            <span style="display: flex; align-items:center; margin-right:10px"
              >01.04.2020</span
            >
            <v-rating size="38"></v-rating>
          </v-row>
          <v-card-text
            >Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deleniti
            quaerat harum vel quod provident alias necessitatibus atque odit
            molestias, nostrum cupiditate incidunt ex et facilis sunt
            perferendis sit placeat dolorum beatae iste autem. Perspiciatis,
            perferendis cum esse ut iste debitis. Inventore pariatur ipsum
            dolores, quidem quisquam libero ea. Nam, eveniet error, neque amet
            maiores alias eaque temporibus, perspiciatis dignissimos blanditiis
            mollitia. Consequatur saepe consequuntur impedit magni, dolor
            perspiciatis exercitationem laborum laudantium incidunt sint commodi
            ipsam assumenda neque delectus dolorem doloremque est? Adipisci
            dolor sequi quis, quos quo incidunt quia molestiae aperiam totam
            maxime fugiat molestias nulla possimus excepturi. Consequuntur,
            laboriosam.</v-card-text
          >
        </v-col>
      </v-card>
    </v-container>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        rating: "",
        title: "",
        text: "",
        adId: this.ad.id 
      };
    },
    computed: {
      orders() {
        return this.$store.getters.comments;
      },
      ad() {
        const id = this.id;
        return this.$store.getters.adById(id);
    },
    },
    mounted() {
       this.$store.dispatch("fetchComments", {adId: this.ad.id} );
    },
    methods: {
      sendComment() {
        this.$store
          .dispatch("createComments", {
            title: this.title,
            text: this.text,
            adId: this.ad.id,
          })
          .finally(() => {
            this.title = "";
            this.text = "";
          });
      },
    },
  };
</script>
