import Vue from 'vue'
import App from './App.vue'
import router from '@/config/router'
import store from '@/vuex/store'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHeading, faBold, faItalic, faListOl, faListUl, faCode, faLink, faImage, faTimes, faArrowLeft, faSignInAlt , faUserSecret ,faUserPlus , faSignOutAlt, faAlignLeft, faAlignCenter, faAlignRight, faPlus, faUndoAlt, faEllipsisH, faCaretDown, faChevronUp, faEllipsisV } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import url from '@/config/baseUrl'
import axios from 'axios'

library.add(fab, faHeading, faBold, faItalic, faListOl, faListUl, faCode, faLink, faImage, faTimes, faArrowLeft, faSignInAlt , faUserSecret, faUserPlus , faSignOutAlt, faAlignLeft, faAlignCenter, faAlignRight, faPlus, faUndoAlt, faEllipsisH, faCaretDown, faChevronUp, faEllipsisV)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(BootstrapVue)
Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.$baseUrl = url.baseUrl

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')