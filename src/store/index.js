import Vue from 'vue'
import Vuex from 'vuex'
import spellspage from './modules/spellspage';
import homepage from './modules/homepage';
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    homepage,
    spellspage
  }
})