<template>
  <div class="blog-list-c">
   <b-card-group columns class="blog-list-p">
      <router-link :to="`/${list.blog._id}`" v-for="(list, index) in posts" :key="index">
        <b-card
                :title= list.blog.title
                :img-src="list.blog.thumbnail"
                :to="`/${list.blog._id}`"
                img-fluid
                img-alt="image"
                img-top>
          <small class="post-wroter">written by <b>{{list.nickname}}</b></small>
          <div class="card-text">
            <div class="blog-tag-list-c" v-for="(tag, idx) in list.blog.tags" :key="idx">
              <router-link :to="`/search/${tag}`">#{{tag}}</router-link>
            </div>
          </div>
          <small class="post-register-date">{{list.blog.registerDate}}</small>
        </b-card>
      </router-link>
    </b-card-group>
    <b-container v-if="!posts.length" class="post-none">
      <b-row>
        <b-col>
          등록된 게시물이 없습니다.
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import dateHelper from '@/commons/functions/dateHelper'
export default {
  name: 'blog-list',
  components: {
  },
  data() {
    return {
      posts: '', 
    }
  },
  created() {
    this.getPosts()
  },
  methods: {
    calculateDate(date) {
      return dateHelper.calculateDate(date)
    },
    getPosts() {
      let url = ''
      if(this.$route.params.tag) url = `${this.$baseUrl}/blog/search/${this.$route.params.tag}`
      else url = `${this.$baseUrl}/blog`
      this.$http.get(url)
      .then(res => {
        const posts = res.data
        const mappedPosts = posts.map(cur => {
          let post = []
          post = cur._id
          return post
        })
        mappedPosts.filter(el => el.blog.registerDate = this.calculateDate(new Date(el.blog.registerDate)))
        this.posts = mappedPosts
      })
      // eslint-disable-next-line
      .catch(() => console.log('No data'))
    }
  },
  watch: {
    '$route': 'getPosts'
  }
}
</script>
<style lang="scss" src="@/assets/css/blog-list.scss"></style>