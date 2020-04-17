<template>
  <v-container>
    <h2>Профиль</h2>
    <form @submit.prevent="submitHandler">
      <v-text-field
        prepend-icon="mdi-account"
        name="Nickname"
        label="Nickname"
        type="text"
        v-model="name"
        :rules="nicknameRules"
      ></v-text-field>
      <v-layout row class="mb-3">
        <v-flex xs12>
          <v-btn class="warning" @click="triggerUpload">
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
      <v-layout row>
        <v-flex xs12>
          <img :src="imageSrc" height="100" v-if="imageSrc" />
        </v-flex>
      </v-layout>
      <v-btn type="submit">Изменить никнейм</v-btn>
    </form>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      nicknameRules: [v => !!v || "Nickname обязательный"],
      image: null,
      imageSrc: ""
    };
  },
  computed: {
    nameS() {
      return this.$store.getters.info.nickname
    }
  },
  created() {
    this.name = this.nameS
  },
  methods: {
    ...mapActions(["updateInfo"]),
    async submitHandler() {
          console.log(this.nameS)
      await this.updateInfo({
        nickname: this.name,
        image: this.image
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
    }
  }
};
</script>
