<template>
  <div id="app">
    <div class="app-w">
      <app-header v-if="showNav"></app-header>
      <div v-if="this.curentRouter != 'admin'" class="app-section-w d-flex flex-column align-items-center">
        <router-view></router-view>
      </div>
    </div>
    <b-container v-if="curentRouter == 'admin'" fluid class="app-admin-w bv-example-row bv-example-row-flex-cols" >
      <b-row>
        <b-col lg="2">
          <app-admin-header></app-admin-header>
        </b-col>
        <b-col lg="10">
          <router-view></router-view>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import AppHeader from '@/shared-components/AppHeader.vue'
import AppAdminHeader from '@/shared-components/AppAdminHeader.vue'
import {EventBus} from '@/commons/functions/eventBus.js'
export default {
  name: 'app',
  components : {
    'app-header' : AppHeader,
    'app-admin-header' : AppAdminHeader
  },
  data() {
    return {
      curentRouter : '',
      showNav : true,
    }
  },
  methods : {
    addCurentRouter () {
      this.curentRouter = this.$route.path.slice(1,6)
      if(this.curentRouter != 'admin') {
        this.showNav = true; 
      }
    }
  },
  watch : {
    '$route' : 'addCurentRouter'
  },
  created() {
      EventBus.$on('showNav', data => {
      this.showNav = data
    })
  }
}
</script>
<style lang="scss" scoped>
  .app-w {
    .app-section-w {
      padding-top: 120px;
    } 
  }
  .app-admin-w.container-fluid {
    padding: 0;
  }
</style>