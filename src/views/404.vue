<template>
  <div>
    <v-container fill-heightv>
      <h1 class="text-center">404</h1>
      <router-link class="d-flex justify-center size-run" to="/">БЕГИТЕ ГЛУПЦЫ</router-link>
    </v-container>
  </div>
</template>

<script>
export default {
  metaInfo() {
    return {
      title: this.$title('404')
    }
  },
}
</script>

<style scoped>
h1 {
  font-size: 100px;
}
.size-run {
  font-size: 100px;
  text-decoration: none;
}
</style>