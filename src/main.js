import { createApp } from "vue";

// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
import './styles/styles.scss'

import "animate.css";
import "css-doodle";
import "~/styles/tailwindcss.css";
import "element-plus/theme-chalk/src/message.scss";
import $ from "jquery";
window.jQuery = window.$ = $;

/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";
/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
/* import solid icons */
import {
  faUserSecret,
  faMonument,
  faBoxArchive,
  faUserAstronaut,
  faWandMagicSparkles,
  faSquarePen,
  faCube,
  faCalendarDays,
  faClock,
  faEye,
  faThumbsUp,
  faQuoteLeft,
  faQuoteRight,
  faAnglesDown,
  faChevronDown
} from "@fortawesome/free-solid-svg-icons";
/* import regular icons */
import {
  faThumbsUp as farThumbsUp,
  faClock as farClock,
  faEye as farEye,
} from "@fortawesome/free-regular-svg-icons";
/* add icons to the library */
library.add(
  faUserSecret,
  faMonument,
  faBoxArchive,
  faUserAstronaut,
  faWandMagicSparkles,
  faSquarePen,
  faCube,
  faCalendarDays,
  faClock,
  faEye,
  faThumbsUp,
  farThumbsUp,
  farClock,
  farEye,
  farThumbsUp,
  faQuoteLeft,
  faQuoteRight,
  faAnglesDown,
  faChevronDown,
);

// import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import VueLazyLoad from "vue3-lazyload";
import { createPinia } from "pinia";
import router from "~/assets/plugins/router/vue-router";
import App from "~/App.vue";

//vue-md-editor
import VMdPreview from "@kangc/v-md-editor/lib/preview";
import "@kangc/v-md-editor/lib/style/preview.css";
import githubTheme from "@kangc/v-md-editor/lib/theme/github.js";
import "@kangc/v-md-editor/lib/theme/style/github.css";
import hljs from "highlight.js";

//mavon-editor
import mavonEditor from "mavon-editor";
import "mavon-editor/dist/css/index.css";

import { animateCSS, stopAnimateCSS } from "~/assets/utils/animations";

VMdPreview.use(githubTheme, {
  Hljs: hljs,
});

const pinia = createPinia();
const app = createApp(App);
// app.use(ElementPlus)
app.use(pinia);
app.use(router);
app.use(VMdPreview);
app.use(mavonEditor);
app.use(VueLazyLoad, {
  loading: "",
  error: "",
});
app.component("font-awesome-icon", FontAwesomeIcon);
app.config.globalProperties.$animate = animateCSS;
app.config.globalProperties.$stopAnimate = stopAnimateCSS;
app.mount("#app");
