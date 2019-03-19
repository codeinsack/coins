<template>
  <div class="small">
    <button
      type="button"
      class="btn btn-primary"
      style="margin-bottom: 50px"
      @click="goBack"
    >Back to Home</button>
    <line-chart :chart-data="inputData"></line-chart>
  </div>
</template>

<script>
import LineChart from './LineChart';

export default {
  components: {
    LineChart,
  },
  props: ['data'],
  data() {
    return {
      datacollection: null,
    };
  },
  methods: {
    goBack() {
      this.$router.back();
    },
  },
  computed: {
    inputData() {
      console.log(this.data);
      const days7 = this.data.price_change_percentage_7d_in_currency;
      const days14 = this.data.price_change_percentage_14d_in_currency;
      const days30 = this.data.price_change_percentage_30d_in_currency;
      return {
        labels: ['7 days', '14 days'],
        datasets: [
          {
            label: 'Eur',
            backgroundColor: 'blue',
            data: [days7.eur, days14.eur, days30.eur],
          },
          {
            label: 'Usd',
            backgroundColor: 'red',
            data: [days7.usd, days14.usd, days30.usd],
          },
          {
            label: 'Rub',
            backgroundColor: 'green',
            data: [days7.rub, days14.rub, days30.rub],
          },
        ],
      };
    },
  },
};
</script>

<style>
  .small {
    max-width: 600px;
    margin:  150px auto;
  }
</style>
