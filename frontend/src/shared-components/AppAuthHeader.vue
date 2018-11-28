<template> 
  <div class="auth-header-w"> 
    <div v-if="auth">
      <small><b>{{userNickname}}</b> 님 환영합니다.</small>
      <button @click="onLogout">
        <span>Logout</span>
        <font-awesome-icon icon="sign-out-alt"></font-awesome-icon>
      </button>
      <router-link v-if="userRole==999" to="/admin">
        <span>Admin</span>
        <font-awesome-icon icon="user-secret"></font-awesome-icon>
      </router-link>
    </div>
    <div v-else>
      <router-link to="/blog/signin">
        <span>Login</span>
        <font-awesome-icon icon="sign-in-alt"></font-awesome-icon>
      </router-link>
      <router-link to="/blog/signup">
        <span>Create New Account</span>
        <font-awesome-icon icon="user-plus"></font-awesome-icon>
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: 'auth-header',
  data() {
    return {
      auth: false,
      email: '',
      userRole : 0,
      userNickname : ''
    }
  },
  created() {
    this.getToken()
    this.getUserRole()
  },
  methods: {
    onLogout() {
      localStorage.removeItem('user-token')
      this.$router.go(this.$router.currentRoute)
    },
    getToken() {
      const token = localStorage.getItem('user-token')
      if(token) this.auth = true
      else this.auth = false
    },
    getUserRole() {
      const token = localStorage.getItem('user-token')
      if(token) {
        this.$http.get(`${this.$baseUrl}/user/${token}`)
        .then(res => {
          this.userNickname = res.data.nickname
          this.userRole = res.data.role
        })
        .catch(err => {
          console.log('err')
        })
      }
    }
  },
  watch: {
    '$route': 'getToken'
  }
}
</script>
<style lang="scss">
.auth-header-w {
  display: flex;
  justify-content: center; 
  align-items: center;
  a {
    color: #777777;
    margin: 0 2.5px;
    text-decoration: none;
    font-size: .8rem;
    cursor: pointer;
    span {
      margin: 0 5px; 
      // color: #a1a1a1;
    }
  }
  a:hover {
    color: #000000;
  }
  button {
    background: none;
    border: none;
    color: #777777;
    font-size: .8rem;
    span {
      margin: 0 5px;
    }
  }
  button:hover {
    color: #000000;
    cursor: pointer;
  }

}
</style>