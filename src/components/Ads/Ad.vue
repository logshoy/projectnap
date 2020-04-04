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
            <addEditAdModal :ad="ad" v-if="isOwner"></addEditAdModal>
            <add-to-cart></add-to-cart>
            <app-buy-modal></app-buy-modal>
          </v-card-actions>
        </v-card>
        <div v-else class="text-xs-center">
          <v-progress-circular indeterminate :size="100" :width="4" color="purple"></v-progress-circular>
        </div>
      </v-flex>
    </v-layout>
    <comments></comments>
    <comment-grid
      baseURL="https://your-app.firebaseio.com"
      apiKey="your-api-key"
      nodeName="nodeNameThatYouCreated"
      maxUserNameLength="30"
      maxCommentLength="1000"
      initialMessageLimit="11"
      maxLineLimit="40"
      maxShowingDepth="5"
      background="rgba(255, 255, 255, 0)"
      commentBackgroundColor="rgba(255, 255, 255, 1)"
      commentTextColor="rgba(29, 33, 41, 1)"
      userNameColor="rgba(6, 177, 183, 1)">
  </comment-grid>
  </v-container>
</template>

<script>
import EditAdModal from "./EditAdModal";
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
    isOwner() {
      return this.ad.ownerId === this.$store.getters.user.id;
    }
  },
  components: {
    Comments,
    addEditAdModal: EditAdModal,
  }
};
</script>
