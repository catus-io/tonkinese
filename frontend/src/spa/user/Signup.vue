<template>
  <b-container class="signup-w">
    <b-row class="signup-c">
      <b-form @submit.prevent="onSubmit">
        <b-form-group label="Email address:"
                      label-for="email"
                      description="We'll never share your email with anyone else">
          <b-form-input id="email"
                        type="email"
                        v-model="form.email"
                        required
                        placeholder="Enter your email">
          </b-form-input>
        </b-form-group>
        <b-form-group label="Nickname:"
                      label-for="nickname"
                      description="It will be identify as a user in this blog.">
          <b-form-input id="nickname"
                        type="text"
                        v-model="form.nickname"
                        required
                        placeholder="Enter your nickname">
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
        <b-form-group label="Re-password:"
                      label-for="repassword">
          <b-form-input id="repassword"
                        type="password"
                        v-model="repassword"
                        required
                        placeholder="Enter password again">
          </b-form-input>
        </b-form-group>
        <p>{{this.alert}}</p>
        <b-button type="submit" variant="primary">Register</b-button>
      </b-form>
    </b-row>
  </b-container>
</template>
<script>
// import inputValidation from '@/commons/validations/input.validation.js'
export default {
  name: 'signup',
  components: {
  },
  data() {
    return {
      form: {
        email: '',
        nickname: '',
        password: '',
      },
      repassword: '',
      alert: ''
    }
  },
  created() {

  },
  methods: {
    onSubmit() {
      // 검증 부분은 다음 버전에서 세밀히 잡아야합니다. 
      // (인스턴스 내부에서 인증, 디렉티브화 하기, 플러그인 화 하기 등등 다양한 방법이 제공)
      if(this.form.password.length < 5) this.alert = '비밀번호 길이가 충분하지 않습니다.'
      else if(this.form.password != this.repassword) this.alert = '비밀번호가 서로 일치하지 않습니다.'
      else {
        this.alert = ''
        this.$http.post(`${this.$baseUrl}/register`, { email: this.form.email, nickname: this.form.nickname, password: this.form.password })
        .then(res => {
          if(res.data.msg) this.$router.push('/signin')
          else this.alert = '서버 오류'
        })
        .catch(err => this.alert = err.response.data.msg)
      }
    }
  }
}
</script>
<style lang="scss">
.signup-w {
  height: calc(83vh - 120px);
  display: flex;
  align-items: center;
  justify-content: center;
  .signup-c {
    width: 60%;
    form {
      width: 100%;
    }

  }
}
</style>
