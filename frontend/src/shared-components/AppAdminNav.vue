<template> 
  <b-nav vertical class="app-admin-nav-c">
    <b-nav-item class="app-admin-nav-i">
      <router-link class="w-100" to="/admin"> DashBoard </router-link> 
     </b-nav-item>
    <b-nav-item class="app-admin-nav-i">User</b-nav-item>
    <b-nav-item class="app-admin-nav-i">
      <router-link class="w-100" to="/admin/blog"> Blog </router-link> 
    </b-nav-item>
    <b-nav-item class="app-admin-nav-i">Setting</b-nav-item>
    <b-button class="blog-new-button-i" size="">
      <router-link to="/blog/new"> Write </router-link>
    </b-button>
  </b-nav>
</template>
<script>
export default {
  name: 'app-admin-nav'
}
</script>
<style lang="scss">
  .app-admin-nav-c {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
    .app-admin-nav-i {
      width: 100%;
      background-color: #ffffff;
      text-align: center;
      transition-duration: 0.5s;
      a {
        width: 100%;
        color: #333333;
        text-decoration: none;
        &.router-link-exact-active {
          font-weight: bold;
        }
      }
    }
    .app-admin-nav-i:hover {
      background-color: #03a87c;
      a {
        color: #ffffff;
      }
    }
    .blog-new-button-i {
      margin-top: 20px;
      background-color: #ffffff;
      transition-duration: 0.5s;
      a {
        color: #333333;
        text-decoration: none;
      }
    }
    .blog-new-button-i:hover {
      background-color: #333333;
      a {
        color: #ffffff;
      }
    }
  }
</style>