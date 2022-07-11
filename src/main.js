import { createApp } from 'vue'

// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
// import './theme/styles.scss'

import $ from 'jquery'
import { createRouter,createWebHashHistory} from "vue-router";

import 'animate.css'
import "element-plus/theme-chalk/src/message.scss"

import App from './App.vue'

//router
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

const app = createApp(App)
// app.use(ElementPlus)
app.use(router)
app.mount('#app')