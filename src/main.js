import Vue from 'vue'
import './plugins/axios'
import './slamdunk'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import store from './store';
import router from './router';
import Sender from './slamdunk/sender';
import {
  error2Event
} from './slamdunk/utils/errorUtils';
Vue.config.productionTip = false

Vue.config.errorHandler = (err) => {
  Sender().send(error2Event(err));
  throw err
}

new Vue({
  vuetify,
  store,
  router,
  render: h => h(App)
}).$mount('#app')
