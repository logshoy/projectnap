<template>
  <v-container fill-height>
    <v-layout row>
      <v-flex xs12 class="text-xs-center pt-5" v-if="loading">
        <v-progress-circular indeterminate :size="100" :width="4" color="purple"></v-progress-circular>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3 v-else-if="!loading && orders.length !== 0">
        <h1 class="text--secondary mb-3">{{'Orders' | localize}}</h1>
        <v-list two-line subheader>
          <v-list-item avatar v-for="order in orders" :key="order.id">
            <v-list-item-action>
              <v-checkbox
                color="success"
                success
                :disabled="order.done"
                :input-value="order.done"
                @change="markDone(order)"
              ></v-checkbox>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{order.name}}</v-list-item-title>
              <v-list-item-subtitle>{{order.phone}}</v-list-item-subtitle>
              <v-list-item-subtitle>{{order.adTitle}} </v-list-item-subtitle>
              <v-list-item-subtitle> {{'Amount' | localize}}: {{order.amount}}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn :to="'/ad/' + order.adId" class="primary">{{'Open' | localize}}</v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-flex>
      <v-flex xs12 class="text-xs-center" v-else>
        <h1 class="text--secondary">{{'ZeroOrders' | localize}}</h1>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  metaInfo() {
    return {
      title: this.$title("Orders")
    };
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    },
    orders() {
      return this.$store.getters.orders;
    }
  },
  methods: {
    markDone(order) {
      this.$store
        .dispatch("markOrderDone", order.id)
        .then(() => {
          order.done = true;
        })
        .catch(() => {});
    }
  },
  created() {
    this.$store.dispatch("fetchOrders");
  }
};
</script>
