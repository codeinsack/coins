import Home from './components/Home.vue';
import Coin from './components/Coin.vue';

export const routes = [
  { path: '/', component: Home },
  { path: '/coins/:id', component: Coin },
];
