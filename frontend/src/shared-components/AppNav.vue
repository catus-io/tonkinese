<template>
  <b-nav class="app-nav-c">
    <b-nav-item><router-link to="/">Posts</router-link></b-nav-item>
    <b-nav-item><router-link to="/tags">Tags</router-link></b-nav-item>
    <b-nav-item><router-link to="/about">About</router-link></b-nav-item>
    <!-- <b-nav-item><router-link to="/new">New</router-link></b-nav-item> -->
  </b-nav>
</template>
<script>
export default {
  name: 'app-nav'
}
</script>
<style lang="scss">
  .app-nav-c {
    display: flex;
    justify-content: center;
    align-items: center;
    a {
      color: #666666;
      &.router-link-exact-active {
        color:#03a87c;
      }
    }
    :hover {
      color:#333333;
    }
  }
</style>