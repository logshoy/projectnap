<template>
  <app id="app">
    <v-app>
      <v-card>
        <v-navigation-drawer app temporary v-model="drawer">
          <v-list nav dense>
            <v-list-item-group v-model="item" color="primary">
              <v-list-item v-for="link of links" :key="link.title" :to="link.url">
                <v-list-item-icon>
                  <v-icon v-text="link.icon"></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="link.title"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item v-if="isUserLoggedIn" @click="onLogout">
                <v-list-item-icon>
                  <v-icon>mdi-logout</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Выйти</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-navigation-drawer>

        <v-toolbar row dense dark color="primary">
          <v-app-bar-nav-icon class="hidden-md-and-up" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
          <v-toolbar-title>
            <router-link to="/" tag="span" class="pointer">Hookah69</router-link>
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items class="hidden-sm-and-down">
            <v-menu>
              <template v-slot:activator="{ on }">
                <v-btn color="primary" v-on="on" depressed>Категории</v-btn>
              </template>
              <v-list color="primary">
                <v-list-item v-for="category in categoryList" :key="category">
                  <v-btn depressed :to="/category/+ category" color="primary">{{category}}</v-btn>
                </v-list-item>
              </v-list>
            </v-menu>
            <v-btn depressed color="primary" v-for="link in links" :key="link.title" :to="link.url">
              <v-icon v-text="link.icon" left></v-icon>
              {{ link.title }}
            </v-btn>
            <v-btn depressed color="primary" to="/cart" v-if="isUserLoggedIn">
              <v-badge offset-y="10" left color="warning">
                <span class="mt-3" slot="badge">{{totalQuantity}}</span>
                <v-icon left>mdi-cart</v-icon>Корзина
              </v-badge>
            </v-btn>
            <v-menu v-if="isUserLoggedIn" depressed>
              <template v-slot:activator="{ on }">
                <v-btn color="primary" v-on="on" depressed>
                  <v-avatar class="mr-3" size="40">
                    <v-img :src="avatar"></v-img>
                  </v-avatar>
                  {{ nickname }}
                </v-btn>
              </template>
              <v-list color="primary">
                <v-list-item>
                  <v-btn depressed color="primary" to="/profile">Профиль</v-btn>
                </v-list-item>
                <v-list-item>
                  <v-btn depressed color="primary" @click="onLogout" v-if="isUserLoggedIn">
                    <v-icon left>mdi-logout</v-icon>Выйти
                  </v-btn>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-toolbar-items>
        </v-toolbar>
        <v-content>
          <router-view></router-view>
        </v-content>
        <v-footer app fixed color="primary" padless>
      <v-row justify="center" no-gutters>
        <v-col class="primary py-4 text-center white--text" cols="12">
          {{ new Date().getFullYear() }} —
          <strong>Vuetify</strong>
        </v-col>
      </v-row>
    </v-footer>
      </v-card>

      <template v-if="error">
        <v-snackbar
          :timeout="5000"
          :multi-line="true"
          color="error"
          @input="closeError"
          :value="true"
        >
          {{ error }}
          <v-btn text dark @click.native="closeError">Закрыть</v-btn>
        </v-snackbar>
      </template>
    </v-app>
  </app>
</template>

<script>
export default {
  data() {
    return {
      drawer: false
    };
  },
  computed: {
    error() {
      return this.$store.getters.error;
    },
    isUserLoggedIn() {
      return this.$store.getters.isUserLoggedIn;
    },
    links() {
      if (this.isUserLoggedIn) {
        return [
          { title: "Заказы", icon: "mdi-star", url: "/orders" },
          { title: "Добавить", icon: "mdi-history", url: "/new" },
          { title: "Мои товары", icon: "mdi-check-circle", url: "/list" }
        ];
      }

      return [
        { title: "Авторизация", icon: "mdi-folder", url: "/login" },
        {
          title: "Регистрация",
          icon: "mdi-account-multiple",
          url: "/registration"
        }
      ];
    },
    totalQuantity() {
      return this.$store.getters.totalQuantity;
    },
    nickname() {
      return this.$store.getters.info.nickname;
    },
    avatar() {
      return this.$store.getters.info.imageSrc;
    },
    categoryList() {
      return this.$store.getters.category;
    }
  },
  methods: {
    closeError() {
      this.$store.dispatch("clearError");
    },
    onLogout() {
      this.$store.dispatch("logoutUser");
      this.$router.push("/");
      this.$store.dispatch("clearCart");
    }
  }
};
</script>

<style scoped>
.pointer {
  cursor: pointer;
}
</style>
