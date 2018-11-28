<template>
  <b-container class="signin-w">
    <b-row class="signin-c">
      <b-form @submit.prevent="onSubmit" id="form">
        <b-form-group label="Email:"
                      label-for="email">
          <b-form-input id="email"
                        type="email"
                        v-model="form.email"
                        required
                        placeholder="Enter your email">
          </b-form-input>
        </b-form-group>
        <b-form-group label="Password:"
                      label-for="password">
          <b-form-input id="password"
                        type="password"
                        v-model="form.password"
                        required
                        placeholder="Enter password">
          </b-form-input>
        </b-form-group>
        <p>{{alert}}</p>
        <b-button type="submit" variant="primary">Login</b-button>
      </b-form>
    </b-row>
  </b-container>
</template>
<script>
export default {
  name: 'signin',
  components: {
  },
  data() {
    return {
      form: {
        email: '',
        password: ''
      },
      alert: ''
    }
  },
  methods: {
    onSubmit() {
      if(this.form.password.length < 5) this.alert = '비밀번호 길이가 충분하지 않습니다.'
      else {
        this.alert = ''
        this.$http.post(`${this.$baseUrl}/signin`, { email: this.form.email, password: this.form.password })
        .then(res => {
          const token = res.data.token
          localStorage.setItem('user-token', token)
          this.$router.push('/')
        })
        .catch(err => this.alert = err.response.data.msg)
      }
    }
  }
}
</script>
<style lang="scss">
.signin-w {
  height: calc(77vh - 120px);
  display: flex;
  align-items: center;
  justify-content: center;
  .signin-c {
    width: 60%;
    form {
      width: 100%;
    }

  }
}
</style>