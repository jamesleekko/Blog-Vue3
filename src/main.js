import { createApp } from 'vue'

// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
// import './styles/styles.scss'

import 'animate.css'
import '~/styles/tailwindcss.css'
import "element-plus/theme-chalk/src/message.scss"
import $ from 'jquery'
window.jQuery = window.$ = $

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
/* import specific icons */
import { faUserSecret, faMonument, faBoxArchive, faUserAstronaut, faWandMagicSparkles } from '@fortawesome/free-solid-svg-icons'
/* add icons to the library */
library.add(faUserSecret, faMonument, faBoxArchive, faUserAstronaut, faWandMagicSparkles)

// import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import VueLazyLoad from 'vue3-lazyload'
import { createPinia } from 'pinia'
import router from '~/assets/plugins/router/vue-router'
import App from '~/App.vue'

import { animateCSS, stopAnimateCSS } from '~/assets/utils/animations'

const pinia = createPinia()
const app = createApp(App)
// app.use(ElementPlus)
app.use(pinia)
app.use(router)
app.use(VueLazyLoad, {
  loading: '',
  error: ''
})
app.component('font-awesome-icon', FontAwesomeIcon)
app.config.globalProperties.$animate = animateCSS
app.config.globalProperties.$stopAnimate = stopAnimateCSS
app.mount('#app')