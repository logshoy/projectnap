<template>
  <app id="app">
    <v-app app>
      <v-dialog v-model="dialog" persistent max-width="590">
        <v-card class="d-flex flex-column align-center">
          <v-card-title class="headline">Добро пожаловать</v-card-title>
          <h1>18 есть да нет?</h1>
          <v-card-actions class="d-flex justify-center">
            <v-btn color="error" text @click="destroy">Меньше 18</v-btn>
            <v-btn color="success" text @click="accept">18 и больше</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog fullscreen v-model="modal" persistent>
        <v-card class="d-flex flex-column justify-center align-center">
          <v-card-title class="headline">Спасибо за честность</v-card-title>
          <h1>
            <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">Возможно вам понравится вот это</a>
          </h1>
        </v-card>
      </v-dialog>
      <v-card flat height="100%">
        <v-navigation-drawer app temporary v-model="drawer">
          <v-list nav dense>
            <v-list-item to="/profile" v-if="isUserLoggedIn">
              <v-list-item-avatar>
                <img :src="avatar" />
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{ nickname }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item-group v-model="item" color="primary">
              <v-list-item to="/category">
                <v-list-item-icon>
                  <v-icon>mdi-book</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>
                    {{
                    "Catalog" | localize
                    }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item v-if="isUserLoggedIn" to="/cart">
                <v-list-item-icon>
                  <v-icon>mdi-cart</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>
                    {{
                    "Basket" | localize
                    }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
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
                  <v-list-item-title>
                    {{
                    "Logout" | localize
                    }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-navigation-drawer>

        <v-toolbar dark row dense color="primary">
          <v-app-bar-nav-icon class="hidden-md-and-up" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
          <v-toolbar-title>
            <router-link to="/" tag="span" class="d-flex text-white pointer">
              Hookah
              <div class="blue-text">6</div>
              <div class="pink-text">9</div>
            </router-link>
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items class="hidden-sm-and-down">
            <v-menu>
              <template v-slot:activator="{ on }">
                <v-btn color="primary" v-on="on" depressed>
                  {{
                  "Catalog" | localize
                  }}
                </v-btn>
              </template>
              <v-list color="primary">
                <v-list-item>
                  <v-btn depressed to="/category" color="primary">
                    {{
                    "AllCategory" | localize
                    }}
                  </v-btn>
                </v-list-item>
                <v-list-item v-for="category in categoryList" :key="category">
                  <v-btn depressed :to="/category/ + category" color="primary">{{ category }}</v-btn>
                </v-list-item>
              </v-list>
            </v-menu>
            <v-btn depressed color="primary" v-for="link in links" :key="link.title" :to="link.url">
              <v-icon v-text="link.icon" left></v-icon>
              {{ link.title }}
            </v-btn>
            <v-btn depressed color="primary" to="/cart" v-if="isUserLoggedIn">
              <v-badge offset-y="10" left color="warning">
                <span class="mt-3" slot="badge">{{ totalQuantity }}</span>
                <v-icon left>mdi-cart</v-icon>
                {{ "Basket" | localize }}
              </v-badge>
            </v-btn>
            <v-menu v-if="isUserLoggedIn" depressed>
              <template v-slot:activator="{ on }">
                <v-btn color="primary" v-on="on" depressed>
                  <v-avatar class="mr-3" :size="40">
                    <v-img :src="avatar"></v-img>
                  </v-avatar>
                  {{ nickname }}
                </v-btn>
              </template>
              <v-list color="primary">
                <v-list-item>
                  <v-btn depressed color="primary" to="/profile">
                    {{
                    "ProfileTitle" | localize
                    }}
                  </v-btn>
                </v-list-item>
                <v-list-item>
                  <v-btn depressed color="primary" @click="onLogout" v-if="isUserLoggedIn">
                    <v-icon left>mdi-logout</v-icon>
                    {{ "Logout" | localize }}
                  </v-btn>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-toolbar-items>
        </v-toolbar>
        <v-content>
          <router-view></router-view>
        </v-content>
      </v-card>
      <v-footer dark padless>
        <v-card color="primary" class="px-9 pb-3 flex">
          <v-card-title class="flex footer-title primary py-3">
            <router-link to="/" tag="span" class="d-flex pointer">
              Hookah
              <div class="blue-text">6</div>
              <div class="pink-text">9</div>
            </router-link>
            <div>
              <a href="https://github.com/logshoy/">
                <v-btn class="primary" text>
                  <v-icon>mdi-github</v-icon>
                </v-btn>
              </a>
              <a href="https://www.youtube.com/channel/UCd84loKaOq6qmXUnr2Rd24g?view_as=subscriber">
                <v-btn class="primary" text>
                  <v-icon>mdi-youtube</v-icon>
                </v-btn>
              </a>
            </div>
            <div>
              {{ new Date().getFullYear() }} —
              <strong>Vuetify</strong>
            </div>
          </v-card-title>
          <v-layout class="d-flex" wrap>
            <v-col cols="12" sm="4">
              <v-list class="d-flex category cols-footer flex-column primary">
                <v-btn
                  class="primary"
                  text
                  v-for="item in categoryList"
                  :key="item"
                  :to="/category/ + item"
                >{{ item }}</v-btn>
              </v-list>
            </v-col>
            <v-col cols="12" sm="4">
              <v-list class="d-flex navigation cols-footer flex-column primary">
                <v-list-item v-for="link of links" :key="link.title" :to="link.url">
                  <v-list-item-icon>
                    <v-icon v-text="link.icon"></v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title v-text="link.title"></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item to="/cart" v-if="isUserLoggedIn">
                  <v-list-item-icon>
                    <v-icon left>mdi-cart</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>Корзина</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-col>
            <v-col class="d-flex time cols-footer" cols="12" sm="4">
              Часы работы:
              <br />Круглосуточно
            </v-col>
          </v-layout>
          <row class="d-flex justify-center">© 2020. ВСЕ ПРАВА ЗАЩИЩЕНЫ</row>
        </v-card>
      </v-footer>

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
      drawer: false,
      dialog: false,
      modal: false
    };
  },
  updated() {
    if (this.eighteen == true) {
      this.dialog = false;
    } else  {
      this.dialog = true
    }
    console.log(this.eighteen,"ss")
     console.log( this.dialog,"ww")
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    },
    error() {
      return this.$store.getters.error;
    },
    isUserLoggedIn() {
      return this.$store.getters.isUserLoggedIn;
    },
    eighteen() {
      return this.$store.getters.eighteen
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
    },
    accept() {
      this.dialog = false;
      this.$store.dispatch("eighteen", true);
    },
    destroy() {
      this.modal = true;
      this.destroy();
    }
  }
};
</script>

<style scoped>
.pointer {
  cursor: pointer;
  color: white;
  font-size: 30px;
}

.blue-text {
  color: blue;
}
.pink-text {
  color: purple;
}

@media (max-width: 599px) {
  .cols-footer {
    align-items: center;
  }
  .time {
    justify-content: center;
  }
  .footer-title {
    justify-content: center;
    align-items: center;
  }
}
@media (min-width: 600px) {
  .category {
    align-items: start;
  }
  .navigation {
    align-items: center;
  }
  .time {
    justify-content: flex-end;
  }
  .footer-title {
    justify-content: space-between;
  }
}
</style>
