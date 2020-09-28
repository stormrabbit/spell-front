// import Vue from 'vue'
import { createApp } from 'vue'

const app = createApp({})

import './plugins/axios'
import './slamdunk'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import store from './store';
import router from './router';
import Sender from './slamdunk/sender';
// eslint-disable-next-line no-irregular-whitespace
import VCharts from 'v-charts';
import introJs from 'intro.js'
import VueIntro from 'vue-introjs'
window.introJs = introJs
app.use(VueIntro);
import 'intro.js/introjs.css';
import {
  error2Event
} from './slamdunk/utils/errorUtils';

app.use(VCharts);

app.config.productionTip = false

// app.config.errorHandler = (err) => {
//   Sender().send(error2Event(err));
//   throw err
// }
app.mount('#app');
// new Vue({
//   vuetify,
//   store,
//   router,
//   render: h => h(App)
// }).$mount('#app')
