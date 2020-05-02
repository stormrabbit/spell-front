import Vue from 'vue'
import Vuex from 'vuex'
import spellspage from './modules/spellspage';
import homepage from './modules/homepage';
import global from './modules/global';
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    homepage,
    spellspage,
    global
  }
})