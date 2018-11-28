<template>
  <div class="blog-detail-w d-flex">
    <div class="profile-w d-flex justify-content-center align-items-center">
      <div class="profile-picture-c"><img src="@/assets/logo.png" alt="profile"></div>
      <div class="profile-info-c">
        {{post.email}} 
        <small v-if="post">{{post.blog.registerDate}}</small>
      </div>
    </div>
    <!-- <div v-if="post"><router-link :to="`/edit/${post.blog._id}`">수정</router-link></div>
    <div><b-link @click="deletePost">삭제</b-link></div> -->
    <div class="blog-detail-title-c" v-if="post">
      <h1 contenteditable="true" readonly>{{post.blog.title}}</h1></div>
    <div class="blog-detail-content-c editor-content-area editor-content-w" v-if="post" v-html="post.blog.content"></div>
  </div>
</template>
<script>
import dateHelper from '@/commons/functions/dateHelper'
export default {
  name: 'blog-detail',
  components: {
  },
  data() {
    return {
      _id: '',
      post: ''
    }
  },
  created() {
    this._id = this.$route.params.id
    this.$http.get(`${this.$baseUrl}/blog/${this._id}`)
    .then(res => {
      this.post = res.data
      this.post.blog.registerDate = this.calculateDate(new Date(this.post.blog.registerDate))
    })
    .catch(() => this.$router.push('/'))
  },
  methods: {
    calculateDate(date) {
      return dateHelper.calculateDate(date)
    },
    deletePost() {
      this.$http.get(`${this.$baseUrl}/blog?method=DELETE&id=${this._id}`)
      .then(res => this.$router.push('/'))
      .catch(err => console.log(err))
    }
  }
}
</script>
<style lang="scss" src="@/assets/css/blog-detail.scss"></style>
<style lang="scss" src="@/assets/css/blog-text-editor-view.scss"></style>