import { createRouter,createWebHashHistory} from "vue-router";
import Index from '~/components/paths/Index.vue'
import AboutMe from '~/components/paths/AboutMe.vue'
import Category from '~/components/paths/Category.vue'
import Article from '~/components/paths/Article.vue'
import MessageBoard from '~/components/paths/MessageBoard.vue'

const routes = [
  { path: '/', component: Index },
  { path: '/index', component: Index },
  { path: '/aboutme', component: AboutMe },
  { path: '/category', component: Category },
  { path: '/article', component: Article },
  { path: '/message_board', component: MessageBoard },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
})

export default router