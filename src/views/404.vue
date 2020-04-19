<template>
  <div>
    <v-container fill-heightv>
      <h1 class="text-center">404</h1>
      
      <img src="https://tenor.com/view/lizard-dance-dancing-swag-cool-gif-14066457" alt="description of gif" />
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
  font-size: 75px;
}
</style>