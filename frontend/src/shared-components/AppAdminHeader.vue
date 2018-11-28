<template>
  <b-container fluid class="app-admin-header bv-example-row bv-example-row-flex-cols">
    <b-row> 
      <b-col lg="12" md="12" sm="12">
        <app-brand></app-brand>
      </b-col>
      <b-col lg="12" md="12" sm="12">
        <app-admin-nav></app-admin-nav>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import AppAdminNav from '@/shared-components/AppAdminNav.vue'
import AppBrand from '@/shared-components/AppBrand.vue'
import { EventBus } from '@/commons/functions/eventBus.js'
import { takeBusToShowNav } from '@/commons/functions/takeBusToData.js'
export default {
  name: 'app-admin-header',
  components: {
    'app-admin-nav' : AppAdminNav,
    'app-brand' : AppBrand,
  },
  data() {
    return {
      curentRouter : '',
      isSignin: false,
      showNav: false
    }
  },
  created() {
    takeBusToShowNav(this.showNav, EventBus)
  },
  methods : {
    addCurentRouter () {
      this.curentRouter = this.$route.path.slice(1,6)
      if(this.curentRouter != 'admin') {
        this.showNav = true; 
      }
    }
  },
  watch: {
    '$route' : 'addCurentRouter'
  }
}
</script>
<style lang="scss">
  .app-admin-header {
    padding-top: 30px;
  }
</style>