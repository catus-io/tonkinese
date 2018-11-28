<template>
  <b-container fluid class="app-header bv-example-row bv-example-row-flex-cols">
    <b-row  align-v="center"> 
      <b-col lg="3" md="12" sm="12"> 
        <app-brand></app-brand>
      </b-col>
      <b-col lg="6" md="12" sm="12">
        <app-nav></app-nav>
      </b-col>
      <b-col lg="3" md="12" sm="12">
        <app-auth></app-auth>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import AppAuthHeader from '@/shared-components/AppAuthHeader.vue'
import AppNav from '@/shared-components/AppNav.vue'
import AppBrand from '@/shared-components/AppBrand.vue'
export default {
  name: 'app-header',
  components: {
    'app-nav' : AppNav,
    'app-auth' : AppAuthHeader,
    'app-brand' : AppBrand
  },
  data() {
    return {
      isSignin: false,
    }
  },
  methods : {
  },
  mounted() {
  },
  watch: {
  }
}
</script>
<style lang="scss">
  .app-header {
    position: fixed;
    width: 100%;
    z-index: 99;
    border-bottom: 1px solid rgba(0, 0, 0, 0.125);
    background: #ffffff;
    padding-top: 10px;
    padding-bottom: 10px;
  a {
  }
  :hover {
    text-decoration: none;
  }
}
</style>