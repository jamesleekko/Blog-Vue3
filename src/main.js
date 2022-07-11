import { createApp } from 'vue'

// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
// import './styles/styles.scss'

import 'animate.css'
import "element-plus/theme-chalk/src/message.scss"
import $ from 'jquery'
window.jQuery = window.$ = $

import router from '~/assets/plugins/router/vue-router'
import store from '~/assets/plugins/vuex/vuex'
import App from '~/App.vue'

const app = createApp(App)
// app.use(ElementPlus)
app.use(store)
app.use(router)
app.mount('#app')