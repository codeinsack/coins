<template>
  <div v-if="!loading">
    <Chart :data="data"></Chart>
  </div>
</template>

<script>
import Vue from 'vue';
import Chart from './Chart.vue';

export default {
  data() {
    return {
      url: '',
      data: null,
      loading: true,
    };
  },
  mounted() {
    const { id } = this.$route.params;
    Vue.axios.get(`${id}`)
      .then((response) => {
        this.loading = false;
        this.data = response.data.market_data;
      });
  },
  components: {
    Chart,
  },
};
</script>
