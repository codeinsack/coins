<template>
  <div style="display: flex; flex-flow: column; align-items: center;">
    <div class="col-sm-10">
      <input
        type="text"
        class="form-control"
        placeholder="Search by name"
        style="margin: 15px;"
        v-model="search"
      >
    </div>
    <table class="table" v-bind:class="{ 'table-hover': !loading }">
      <thead>
      <tr>
        <th scope="col" @click="getCoins(0, 'id')">Id</th>
        <th scope="col" @click="getCoins(0, 'name')">Name</th>
        <th scope="col" @click="getCoins(0, 'symbol')">Symbol</th>
      </tr>
      </thead>
      <tbody>
      <template v-if="!loading">
        <tr v-for="coin in coins" :key="coin.id" @click="changeRoute(coin.id)" >
          <th scope="row">{{ coin.id }}</th>
          <td>{{ coin.name }}</td>
          <td>{{ coin.symbol }}</td>
        </tr>
      </template>
      <template v-else>
        <tr>
          <td colspan="3" align="center">
            <div
              class="spinner-border text-primary"
              role="status"
              style="width: 7rem; height: 7rem; margin: 200px 0;">
              <span class="sr-only">Loading...</span>
            </div>
          </td>
        </tr>
      </template>
      </tbody>
    </table>
    <pagination
      :current="currentPage"
      :total="totalCoins"
      :perPage="perPage"
      @page-changed="getCoins"
    ></pagination>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Pagination from './Pagination.vue';

export default {
  data() {
    return {
      coins: [],
      totalCoins: 0,
      perPage: 10,
      currentPage: 1,
      search: '',
    };
  },
  methods: {
    getCoins(page) {
      const filteredCoins = this.$store.getters.coinItems
        .filter(coin => coin.name.toLowerCase().match(this.search));
      this.coins = filteredCoins
        .slice(this.perPage * page, this.perPage + this.perPage * page);

      this.totalCoins = filteredCoins.length;
      this.currentPage = page;
    },
    changeRoute(id) {
      this.$router.push(`coins/${id}`);
    },
  },
  computed: {
    ...mapGetters([
      'loading',
      'coinItems',
    ]),
  },
  watch: {
    loading() {
      this.getCoins(0);
    },
    search() {
      this.getCoins(0);
    },
  },
  mounted() {
    this.$store.dispatch('getAllCoinItems');
  },
  created() {
    this.getCoins(0);
  },
  components: {
    pagination: Pagination,
  },
};
</script>
