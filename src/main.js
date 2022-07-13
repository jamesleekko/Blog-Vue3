import { createApp } from 'vue'

// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
// import './styles/styles.scss'

import 'animate.css'
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

import router from '~/assets/plugins/router/vue-router'
import store from '~/assets/plugins/vuex/vuex'
import App from '~/App.vue'

const app = createApp(App)
// app.use(ElementPlus)
app.use(store)
app.use(router)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')