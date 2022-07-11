import { createRouter,createWebHashHistory} from "vue-router";
import Index from '~/components/paths/Index.vue'
import AboutMe from '~/components/paths/AboutMe.vue'

const routes = [
  { path: '/', component: Index },
  { path: '/index', component: Index },
  { path: '/aboutme', component: AboutMe },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
})

export default router