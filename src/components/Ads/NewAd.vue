<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h1 class="text--secondary mb-3">Добавить товар</h1>
        <v-form v-model="valid" ref="form" validation class="mb-3">
          <v-text-field
            name="title"
            label="Добавить название"
            type="text"
            v-model="title"
            required
            :rules="[v => !!v || 'Title is required']"
          ></v-text-field>
          <v-text-field
            name="description"
            label="Добавить описание"
            type="text"
            v-model="description"
            multi-line
            :rules="[v => !!v || 'Description is required']"
          ></v-text-field>
          <v-text-field
            name="price"
            label="Добавить цену"
            type="number"
            v-model="price"
            multi-line
            :rules="[v => !!v || 'Price is required']"
          ></v-text-field>
          <v-select
            label="Добавить категорию"
            :items="categoryList"
            v-model="category"
            :rules="[v => !!v || 'Category is required']"
          ></v-select>
        </v-form>
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
        <v-layout row>
          <v-flex xs12>
            <v-switch label="Добавить в промо?" v-model="promo" color="primary"></v-switch>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12>
            <v-spacer></v-spacer>
            <v-btn
              :loading="loading"
              :disabled="!valid || !image || loading"
              class="success"
              @click="createAd"
            >Добавить товар</v-btn>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      description: "",
      price: "",
      promo: false,
      valid: false,
      image: null,
      imageSrc: "",
      category: ""
    };
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    },
    categoryList() {
      return this.$store.getters.category;
    },
  },
  mounted() {
      this.$store.dispatch('featchCategory')
  },
  methods: {
    createAd() {
      if (this.$refs.form.validate() && this.image) {
        const ad = {
          title: this.title,
          description: this.description,
          price: this.price,
          promo: this.promo,
          image: this.image,
          category: this.category
        };

        this.$store
          .dispatch("createAd", ad)
          .then(() => {
            this.$router.push("/list");
          })
          .catch(() => {});
      }
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
