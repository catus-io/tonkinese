<template>
  <div class="app-brand-c">
    <router-link to="/">
      <h1>VUETIFUL</h1>
    </router-link>
  </div>
</template>
<script>
export default {
  name: 'app-brand'
}
</script>
<style lang="scss">
  .app-brand-c {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    a:hover {
      text-decoration: none;
    }
    h1 {
      font-size: 1.2rem;
      font-family: 'Abril Fatface', cursive;
      margin: 0;
      color: #333333;
    }
    h1:hover {
      color:#03a87c;
    }
  }
</style>