<template>
  <b-container fluid class="admin-blog-list-w bv-example-row bv-example-row-flex-cols">
    <b-row  align-v="center">
      <b-col class="admin-blog-list-c" lg="10" md="12" sm="12"> 
        <b-card-group deck>
          <b-card no-body header="<b>Blog List</b>">
            <b-list-group flush v-if="posts">
              <b-list-group-item  v-for="(list, index) in posts" :key="index">
                <b-container>
                  <b-row>
                    <b-col cols="8">
                      <h5>{{index+1}}. {{list.blog.title}}</h5>
                      <small> written by <b>{{list.nickname}}</b></small>
                      <span class="delete-and-modify">
                        <small v-if="posts"><router-link class="modify-i" :to="`/edit/${list.blog._id}`">수정</router-link></small>
                        <small><b-link class="delete-i" @click="deletePost(list.blog._id)">삭제</b-link></small>
                      </span>
                    </b-col>
                    <b-col align-self="center" cols="4">
                      <small class="blog-tag-list" v-for="(tag, idx) in list.blog.tags" :key="idx">
                        <router-link :to="`/search/${tag}`">#{{tag}}</router-link>
                      </small>
                    </b-col>
                  </b-row>
                </b-container> 
              </b-list-group-item>
            </b-list-group>
            <b-list-group flush v-if="!posts">
              <b-list-group-item>
                <h5>No Blog Post</h5>
              </b-list-group-item>
            </b-list-group>
            <b-card-body>
              The above list is a list of blogs and is an administration page that you can edit and delete.
              <br/>You can also write blog posts.
            </b-card-body>
          </b-card>
        </b-card-group>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import dateHelper from '@/commons/functions/dateHelper'
export default {
  name: 'admin-blog-list',
  components: {
  },
  data() {
    return {
      _id: '',
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
    },
    deletePost(_id) {
      this.$http.get(`${this.$baseUrl}/blog?method=DELETE&id=${_id}`)
      .then(res => this.$router.push('/admin'))
      .catch(err => console.log(err))
    }
  },
  watch: {
    '$route': 'getPosts'
  }
}
</script>
<style lang="scss">
  .admin-blog-list-w {
    padding-top : 83px;
    .delete-and-modify {
      margin-left: 10px;
      small {
        margin: 0 2.5px;
        font-weight: bold;
      }
      .modify-i {
        color: #333333;
      }
      .delete-i {
        color: #dc3545;
      }
    }
    .blog-tag-list {
      a {
        color: #333333;
        font-weight: bold;
      }
    }
  }
</style>