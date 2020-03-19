<template>
  <v-app>
    <v-navigation-drawer app v-model="drawer">
      <v-list  nav dense>
        <v-list-item-group v-model="item" color="primary">
        <v-list-item v-for="link of links" :key="link.title" :to="link.url">
          <v-list-item-icon>
            <v-icon v-text="link.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="link.title"></v-list-item-title>
          </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>

    </v-navigation-drawer>

    <v-toolbar app dark color="primary">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Ad application</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-icon>{{ svgPath }}</v-icon>
        <v-btn
          v-for="link in links"
          :key="link.title"
          :to="link.url"
          flat
        >
          <v-icon v-text="link.icon" left></v-icon>
          {{link.title}}
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>


    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>


export default {
  data () {
    return {
      drawer: false,
      links: [
        {title: 'Login', icon: 'mdi-folder', url: '/login'},
        {title: 'Registration', icon: 'mdi-account-multiple', url: '/registration'},
        {title: 'Orders', icon: 'mdi-star', url: '/orders'},
        {title: 'New ad', icon: 'mdi-history', url: '/new'},
        {title: 'My ads', icon: 'mdi-check-circle', url: '/list'}
      ]
    }
  }
}
</script>
