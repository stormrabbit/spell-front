import Vue from 'vue'
import VueRouter from 'vue-router'
import SpellBookPage from '@containers/SpellBook.vue';
import Charactor from '@containers/Charactor.vue';
import Editor from '@containers/Editor';
import SlamDunk from '@containers/SlamDunk';
import Charts from '@containers/Charts';
Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'SpellBookPage',
    component: SpellBookPage
  },
  {
    path: '/charactor',
    name: 'Charactor',
    component: Charactor
  },
    {
        path: '/editor',
        name: 'Editor',
        component: Editor
    },
    {
        path: '/slamdunk',
        name: 'SlamDunk',
        component: SlamDunk
    },{
      path: '/charts',
      name: 'Charts',
      component: Charts
    }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router