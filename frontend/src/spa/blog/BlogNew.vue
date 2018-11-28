<template>
  <b-container fluid class="d-flex align-items-center blog-new-w">
    <div class="d-flex align-items-center justify-content-center blog-new-c">
      <b-form @submit.prevent="onSubmit">
        <div class="blog-new-nav-c d-flex align-items-center">
          <b-link @click="goBack"><font-awesome-icon icon="arrow-left"></font-awesome-icon></b-link>
          <b-button type="button" @click="toggleModal">게시하기</b-button>
        </div>
        <h1 id="title" contenteditable="true" placeholder="Title" ref="blog-title" @keypress="moveToContent" @keydown="moveToContent" @keyup="moveToContent"></h1>
        <blog-text-editor></blog-text-editor>
        <transition name="bounce">
          <div v-show="modal" class="modal-w">
            <font-awesome-icon icon="times" @click="toggleModal" class="toggleModal"></font-awesome-icon>
            <div class="modal-c thumbnail-c">
              <div class="modal-p">
                <h3>대표 이미지</h3>
                <small>대표 이미지는 당신의 글을 더욱 빛나게 합니다.</small>
                <b-form-file v-model="thumbnail" 
                             accept=".png, .jpg, .jpeg, .gif"
                             placeholder="여기를 클릭하여 이미지를 불러오세요!" 
                             @change="inputImage"></b-form-file>
                <div class="preview-image-w">
                  <img class="preview-image" v-if="preview" :src="preview" alt="thumbnail">
                  <div class="preview-image" v-else>미리보기 이미지가 보입니다.</div>
                </div>
              </div>
            </div>
            <div class="modal-c tags-c">
              <div class="modal-p">
                <h3>태그 입력</h3>
                <small>독자들이 검색하기 쉽도록 태그를 입력하세요.</small>
                <div :class="`blog-new-form-tag-c ${tagWarn}`">
                  <div id="blog-new-form-tag-p" class="blog-new-form-tag-p" ref="tag-content" @click="onTagFocus">
                    <input type="text" v-model="tag" @keydown="onKeydown">
                  </div>
                </div>
                <small v-if="tagWarn == 'exceed'" class="tagWarn">태그 입력은 <b>최대 5개</b>까지 허용합니다.</small>
                <small v-else-if="tagWarn == 'lack'" class="tagWarn">태그를 <b>1개 이상</b> 작성하세요.</small>
                <br/>
                <small>예) <b> vuejs </b><b> nodejs </b> <b> javascript </b></small>
                <br/>
                <small>독자들을 위한 태그를 잘 작성하셨나요? 그렇다면...</small>
                <br/>
                <b-button class="blogSubmit" type="submit" :disabled="validation">게시하기</b-button>
              </div>
            </div>
          </div>
        </transition>
      </b-form>
    </div>
  </b-container>
</template>
<script>
import { EventBus } from '@/commons/functions/eventBus.js'
import { takeBusToShowNav } from '@/commons/functions/takeBusToData.js'
import BlogTextEditor from '@/shared-components/BlogTextEditor.vue'
export default {
  name: 'blog-new',
  components: { 'blog-text-editor': BlogTextEditor },
  data() {
    return {
      _id: this.$route.params.id,
      form: { title: '', tags: [], thumbnail: null },
      tag: '',
      thumbnail: null,
      modal: false,
      preview: '',
      previewUrl: '', // src은 file로 전환되기 때문에 url만 따로 필요
      showNav: false
    }
  },
  created() {
    if(this.$route.params.id) {
      this._id = this.$route.params.id
      this.$http.get(`${this.$baseUrl}/blog/${this.$route.params.id}`)
      .then(res => {
        const blog = res.data.blog
        this.form.title = blog.title
        blog.tags.forEach(el => this.createTag(el))
        this.$children[0].$refs['blog-content'].innerHTML = blog.content
        this.preview = blog.thumbnail
        this.previewUrl = blog.thumbnail
      })
    }
    takeBusToShowNav(this.showNav, EventBus)
  },
  mounted() {
    this.$refs['blog-title'].focus()
  },
  computed: {
    tagWarn: function() {
      if(this.form.tags.length >= 5 && this.tag) return 'exceed'
      else if(!this.form.tags.length) return 'lack'
    },
    validation: function() {
      return ((this.form.tags.length && this.form.tags.length <= 5) && this.form.title) ? false : true 
    }
  },
  methods: {
    containsTag(tag) { return this.form.tags.includes(tag) },
    createTagAsDiv(tag) {
      const div = document.createElement('div')
      div.classList.add('tag-span')
      div.innerHTML = tag
      return div 
    },
    createTag(tag) {
      const div = this.createTagAsDiv(tag)
      this.putTagDiv(div)
      this.form.tags.push(tag)
    },
    goBack() {
      this.$router.go(-1)
    },
    inputImage(e) {
      const file = e.target.files[0]
      if(file) {
        this.form.thumbnail = file
        this.readImage(file)
      }
    },
    moveToContent(event) {
      if(event.keyCode === 13 || event.keyCode === 9) {
        event.preventDefault()
        this.$children[0].$refs['blog-content'].focus()
      }
    },
    readImage(file) {
      const fileReader = new FileReader()
      fileReader.readAsDataURL(file)
      fileReader.onload = e => {
        this.preview = e.target.result
      }
    },
    onSubmit() {
      const form = new FormData()
      form.append('title', this.form.title)
      form.append('tags', this.form.tags)
      if(this.form.thumbnail) form.append('thumbnail', this.form.thumbnail)
      form.append('content', this.$children[0].$refs['blog-content'].innerHTML)
      form.append('exThumbnail', this.previewUrl)
      let method = ''
      if(this.$route.params.id) {
        form.append('_id', this._id)
        method = 'PUT'
      }
      this.$http.post(
        `${this.$baseUrl}/blog`, 
        form,
        {
          headers: {
          'Content-Type': 'multipart/form-data',
          'method': method,
          'authorization': localStorage.getItem('user-token')
          }
        })
        .then(() => this.$router.push('/')
        )
        .catch(err => {
          if(err.response.data.msg == 'invalid') {
            localStorage.removeItem('user-token')
            this.$router.push('/blog/signin')
          }
          /* eslint-disable */
          else console.log(err)
        }) 
    },
    onTagFocus(event) {
      const target = event.target
      const input = target.lastChild
      if(input && input.focus) input.focus()
    },
    onKeydown(event) {
      let keyCode = event.keyCode
      if(keyCode == 32 || keyCode == 188 || keyCode == 9) {
        event.preventDefault()
        // 태그 개수 5개 제한
        if(!this.tag) return // 입력한 태그가 없을 시
        if(this.containsTag(this.tag)) return // 입력한 태그가 중복일 때
        if(this.form.tags.length > 4) {
          this.tag = ''
          return;
        }
        this.createTag(this.tag)
        this.tag = ''
      }
      else if(keyCode == 8) this.removeTag() 
    },
    toggleModal() {
      this.form.title = this.$refs['blog-title'].innerText
      this.modal = !this.modal
    },
    putTagDiv(div) {
      const tagContent = this.$refs['tag-content']
      if(tagContent.children.length == 1) tagContent.prepend(div) // 누적된 태그가 없을 때는 태그 컨텐트 가장 앞에 추가
      else {
        const children = tagContent.children
        children[children.length - 2].after(div)
      }
    },
    removeTag() {
      const tagContent = this.$refs['tag-content']
      if(!this.tag && this.form.tags.length) { // 태그 입력이 없거나 현재 누적된 태그가 없을 때만 이전 태그를 지웁니다.
        tagContent.children[tagContent.children.length - 2].remove()
        this.form.tags.pop()
      }
    }
  }
}
</script>
<style lang="scss" src="@/assets/css/blog-new.scss"></style>