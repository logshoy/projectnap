<template>
  <v-container>
    <v-layout row>
      <v-flex class="form-ad" xs12 sm6 offset-sm3>
        <h1 class="text--secondary mb-3">{{'AdAdd' |localize}}</h1>
        <v-form v-model="valid" ref="form" validation class="mb-3">
          <v-text-field
            name="title"
            :label="'Title' |localize"
            type="text"
            v-model="title"
            required
            :rules="[v => !!v || 'Title is required']"
          ></v-text-field>
          <v-text-field
            name="description"
            :label="'Descriprion' |localize"
            type="text"
            v-model="description"
            multi-line
            :rules="[v => !!v || 'Description is required']"
          ></v-text-field>
          <v-text-field
            name="price"
            :label="'Price' |localize"
            type="number"
            v-model="price"
            multi-line
            :rules="[v => !!v || 'Price is required']"
          ></v-text-field>
          <v-select
            :label="'Category' |localize"
            :items="categoryList"
            v-model="category"
            :rules="[v => !!v || 'Category is required']"
          ></v-select>
        </v-form>
        <v-container>
          <v-layout row class="mb-3">
            <v-flex xs12>
              <v-btn class="warning" @click="triggerUpload">
                {{'Image' |localize}}
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
              <v-switch :label="'AddToPromo' | localize" v-model="promo" color="primary"></v-switch>
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
              >{{'AdAdd' | localize}}</v-btn>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  metaInfo() {
    return {
      title: this.$title("AdAdd")
    };
  },
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
    }
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

<style >
@media (max-width: 599px) {
  .form-ad {
    padding: 0 10px;
  }
}
</style>