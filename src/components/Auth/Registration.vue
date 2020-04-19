<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md6>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>{{'Registration' | localize}}</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form v-model="valid" ref="form" lazy-validation>
              <v-text-field
                prepend-icon="mdi-account"
                name="email"
                label="Email"
                type="email"
                v-model="email"
                :rules="emailRules"
              ></v-text-field>
              <v-text-field
                prepend-icon="mdi-lock"
                name="password"
                :label="'Password' | localize"
                type="password"
                :counter="6"
                v-model="password"
                :rules="passwordRules"
              ></v-text-field>
              <v-text-field
                prepend-icon="mdi-lock"
                name="Confirm Password"
                :label="'ConfirmPassword' | localize"
                type="password"
                :counter="6"
                v-model="confirmPassword"
                :rules="confirmPasswordRules"
              ></v-text-field>
              <v-text-field
                prepend-icon="mdi-account"
                name="Nickname"
                label="Nickname"
                type="text"
                v-model="nickname"
                :rules="nicknameRules"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              @click="onSubmit"
              :loading="loading"
              :disabled="!valid || loading"
              >{{'CreateAcc' | localize}}</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

  export default {
    metaInfo() {
    return {
      title: this.$title('Registration')
    }
  },
    data() {
      return {
        email: "",
        password: "",
        confirmPassword: "",
        valid: false,
        nickname: "",
        emailRules: [
          (v) => !!v || "E-mail обязательный",
          (v) => emailRegex.test(v) || "E-mail должен быть валидным",
        ],
        passwordRules: [
          (v) => !!v || "Пароль обязательный",
          (v) =>
            (v && v.length >= 6) || "Пароль должен быть больше чем 6 символов",
        ],
        confirmPasswordRules: [
          (v) => !!v || "Пароль обязательный",
          (v) => v === this.password || "Пароль не совпадает",
        ],
        nicknameRules: [(v) => !!v || "Nickname обязательный"],
      };
    },
    methods: {
      onSubmit() {
        if (this.$refs.form.validate()) {
          const user = {
            email: this.email,
            password: this.password,
            nickname: this.nickname,
          };
          this.$store
            .dispatch("registerUser", user)
            .then(() => {
              this.$router.push("/");
            })
            .catch(() => {});
        }
      },
    },
  };
</script>
