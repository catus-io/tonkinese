<template>
  <div class="blog-tags-w">
    <b-list-group class="blog-tags-c">
      <b-list-group-item v-for="(tag, index) in tags" :key="index" class="blog-tags-p d-flex justify-content-between">
        <router-link :to="`/search/${tag.name}`">{{tag.name}}</router-link>
        <b-badge class="blog-tags-i" variant="info">{{tag.count}}</b-badge>
      </b-list-group-item>
    </b-list-group>
    <b-container v-if="!tags" class="tags-none">
      <b-row>
        <b-col cols="12" sm="12">
          태그와 관련 된 포스팅이 없습니다.
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
export default {
  name: 'blog-tags',
  components: {
  },
  data() {
    return {
      tags: '' 
    }
  },
  created() {
    this.$http.get(`${this.$baseUrl}/tags`)
    .then(res => {
      if(Object.getOwnPropertyNames(res.data).length) this.tags = res.data
    })
    /* eslint-disable */
    .catch(err => {
      console.log('서버 에러')
    })
  }
}
</script>
<style lang="scss" src="@/assets/css/blog-tags.scss"></style>