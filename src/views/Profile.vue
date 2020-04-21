<template>
  <v-container>
    <h2>{{'ProfileTitle' | localize}}</h2>
    <v-layout class="d-flex align-center mx-2">
        <img :src="imageSrc" height="100" v-if="imageSrc" />
        <img :src="avatar" v-else height="100" />
        <v-btn class="ml-9 success"  @click="changeAvatar">Изменить аватар</v-btn>
    </v-layout>
    <v-layout row class="mb-3 mx-2">
      <v-flex xs12>
        <v-btn class="warning mt-3" @click="triggerUpload">
          Изображение
          <v-icon right dark>mdi-image</v-icon>
        </v-btn>
        <input
          ref="fileInput"
          type="file"
          style="display: none;"
          accept="image/*"
          @change="onFileChange"
        />
      </v-flex>
    </v-layout>

    <form @submit.prevent="submitHandler">
      <v-col cols="12" sm="8" md="4">
      <v-text-field
        prepend-icon="mdi-account"
        name="Nickname"
        label="Nickname"
        type="text"
        v-model="name"
        :rules="nicknameRules"
      ></v-text-field>
      </v-col>
      <div class="d-flex">
      <span class="d-flex align-center left-switch">En</span> <v-switch success v-model="isRuLocale" label="Ru"></v-switch>
       </div>
      <v-btn class="success" type="submit">Изменить данные</v-btn>
    </form>
    <v-switch
          v-model="$vuetify.theme.dark"
          hide-details
          inset
          label="Theme Dark"
        ></v-switch>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
export default {
  metaInfo() {
    return {
      title: this.$title('ProfileTitle')
    }
  },
  data() {
    return {
      nicknameRules: [v => !!v || "Nickname обязательный"],
      image: null,
      imageSrc: "",
      name: "",
      isRuLocale: true
    };
  },
  computed: {
    nameS() {
      return this.$store.getters.info;
    },
    avatar() {
        return this.$store.getters.info.imageSrc;
      },
  },
  mounted() {
    this.name = this.nameS.nickname;
    this.isRuLocale = this.nameS.locale === "ru-RU";
  },
  methods: {
    ...mapActions(["updateInfo"]),
    async submitHandler() {
      await this.updateInfo({
        nickname: this.name,
        locale: this.isRuLocale ? "ru-RU" : "en-US"
      });
    },
    triggerUpload() {
      this.$refs.fileInput.click();
    },
    onFileChange(event) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        this.imageSrc = reader.result;
      };
      reader.readAsDataURL(file);
      this.image = file;
    },
    changeAvatar() {
      this.$store.dispatch("changeAvatar", this.image);
    }
  }
};
</script>

<style>
  .left-switch{
    color:  rgba(0,0,0,.6);
  }
</style>