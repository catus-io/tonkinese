<template>
  <b-container class="blog-text-editor-w">
    <div v-show="isLineHelper" class="line-helper-w" :style="{ top: lineHelperTop + 'px', left: lineHelperLeft + 'px' }" ref="line-helper">
      <transition name="fade">
        <b-button v-if="isLineHelperInActive == 'inActive'" size="sm" class="line-helper-button" @click="toggleLineHelperMenu">
          <font-awesome-icon icon="plus"></font-awesome-icon>
        </b-button>
        <b-button v-if="isLineHelperInActive == 'active'" size="sm" class="line-helper-button active" @click="toggleLineHelperMenu">
          <font-awesome-icon icon="times"></font-awesome-icon>
        </b-button>
      </transition>
      <transition name="slide-fade">
        <div v-if="isLineHelperMenu" class="line-helper-menu-w">
          <label for="file-input" class="line-helper-menu">
            <font-awesome-icon icon="image" class="file-input-icon"></font-awesome-icon>
            <input id="file-input" type="file" size="sm" class="line-helper-menu" accept=".png, .jpg, .jpeg, .gif" @change="onChange"/>
          </label>
          <b-button size="sm" class="line-helper-menu" @click="putHrOrPre('insertHorizontalRule')">
            <font-awesome-icon icon="ellipsis-h"></font-awesome-icon>
          </b-button>
          <b-button size="sm" class="line-helper-menu" @click="putHrOrPre('<PRE>')">
            <font-awesome-icon icon="code"></font-awesome-icon>
          </b-button>
        </div>
      </transition>
    </div>
    <div class="blog-text-editor-c" @mouseup="onMouseup" @click="hideAll">
      <div :class="isEditHelper" class="blog-text-editor-helper-c" :style="{ top: editHelperTop + 'px', left: editHelperLeft + 'px' }" ref="edit-helper">
        <b-button size="lx">
          <font-awesome-icon icon="bold" @click="execCommand('bold')"></font-awesome-icon>
        </b-button>
        <b-button size="lx">
          <font-awesome-icon icon="italic" @click="execCommand('italic')"></font-awesome-icon>
        </b-button>
        <b-button size="lx" id="link-popover">
          <font-awesome-icon icon="link" @click="linkPop"></font-awesome-icon>
        </b-button>
        <b-popover class="link-helper-popover-w" :show.sync="linkShow" ref="popover" target="link-popover">
          <b-form-input class="link-helper-w" type="text" placeholder="url" size="sm" v-model="link"></b-form-input>
          <b-button class="link-helper-button" size="sm" @click="addLink" variant="primary">
            <font-awesome-icon icon="plus"></font-awesome-icon>
          </b-button>
          <b-button class="link-helper-button" size="sm" @click="cancelLinkPop" variant="danger">
            <font-awesome-icon class="icon" icon="undo-alt"></font-awesome-icon>
          </b-button>
          <b-alert :show="linkAlert">
            <strong>Please put link</strong><br>
          </b-alert>
        </b-popover>
        <b-button size="lx">
          <font-awesome-icon icon="align-left" @click="execCommand('justifyLeft')"></font-awesome-icon>
        </b-button>
        <b-button size="lx">
          <font-awesome-icon icon="align-center" @click="execCommand('justifyCenter')"></font-awesome-icon>
        </b-button>
        <b-button size="lx">
          <font-awesome-icon icon="align-right" @click="execCommand('justifyRight')"></font-awesome-icon>
        </b-button>
      </div>
      <div class="editor-content-w" data-key="editor" contenteditable="true" ref="blog-content" placeholder="Tell your story..." @keyup="onEditorKeyup"></div>
    </div>
  </b-container>
</template>
<script>
export default {
  name: 'blog-text-editor',
  data() {
    return {
      linkAlert: false,
      linkShow: false, // 링크 입력란 활성화
      link: '', // 사용자 링크 입력
      selection: null, // 사용자가 선택했던 selection
      isEditHelper: '', // edit helper 활성화
      editHelperTop: 0, // edit helper top
      editHelperLeft: 0, // edit helper left
      lineHelperTop: 0, // line helper top
      lineHelperLeft: 0, // line helper left
      isLineHelper: true, // line helper
      isLineHelperInActive: 'inActive', // line helper 활성화
      isLineHelperMenu: false, // line helper menu 활성화 
      imageSelection: null
    }
  },
  mounted() {
    const { top, left, width } = this.$refs['blog-content'].getBoundingClientRect()
    const { offsetWidth } = this.$refs['line-helper']
    this.lineHelperTop = top + 5
    this.lineHelperLeft = left - (offsetWidth + 15)
  },
  methods: {
    addLink() {
      if(!this.link) {
        this.linkAlert = true
        return
      }
      const aEl = document.createElement('a')
      aEl.setAttribute('href', this.link)
      aEl.innerHTML = this.selection.toString()
      this.selection.deleteContents()
      this.selection.insertNode(aEl)
      this.selection = null
      this.linkShow = false
      this.link = ''
      this.linkAlert = false
    },
    cancelLinkPop() {
      this.linkShow = false
    },
    clearEditHelperLocation() {
      this.editHelperLeft = -300
    },
    clearTag(selection) {
      const tag = selection.focusNode.parentNode.previousSibling 
      if(tag && (tag.tagName == 'H2' || tag.tagName == 'H3' || tag.tagName == 'H4')) document.execCommand('formatBlock', false, 'div')
      else if(tag && tag.tagName == 'BLOCKQUOTE') document.execCommand('formatBlock', false, 'div')
      else if(selection.focusNode.tagName == 'PRE') document.execCommand('formatBlock', false, 'div')
    },
    execCommand(exec) {
      document.execCommand(exec)
      this.isEditHelper = false
      this.isLineHelperMenu = false
    },
    hideAll() {
      this.cancelLinkPop()
    },
    linkPop() {
      this.selection = document.getSelection().getRangeAt(0)
      this.linkShow = true
    },
    // 리팩토링 요망
    onEditorKeyup(event) {
      const selection = document.getSelection()
      const keyCode = event.keyCode
      this.imageSelection = selection.getRangeAt(0)
      this.toggleLineHelper(selection)
      this.showEditHelper(selection)
      if(keyCode === 13) this.clearTag(selection)
      if(keyCode === 32 || keyCode === 9) {
        let data = (selection.focusNode.data) ? selection.focusNode.data.trim() : ''
        if(data.startsWith('*')) {
          event.preventDefault()
          document.execCommand('insertUnOrderedList')
          selection.focusNode.parentNode.innerHTML = ''
        }
        else if(data.startsWith('1.')) {
          event.preventDefault()
          document.execCommand('insertOrderedList')
          selection.focusNode.parentNode.innerHTML = ''
        }
        else if(data.startsWith('#')) {
          if(data == '#') {
            event.preventDefault()
            document.execCommand('formatBlock', true, '<H2>')
            selection.focusNode.parentNode.innerHTML = '&nbsp;'
          }
          else if(data == '##') {
            event.preventDefault()
            document.execCommand('formatBlock', false, '<H3>')
            selection.focusNode.parentNode.innerHTML = '&nbsp;'
          }
          else if(data == '###') {
            event.preventDefault()
            document.execCommand('formatBlock', false, '<H4>')
            selection.focusNode.parentNode.innerHTML = '&nbsp;'
          }
        }
        else if(data.startsWith('>')) {
          event.preventDefault()
          document.execCommand('formatBlock', false, '<BLOCKQUOTE>')
          selection.focusNode.parentNode.innerHTML = '&nbsp;'
        }
      }
    },
    onChange(event) {
      if(!this.imageSelection) return
      const file = event.target.files[0]
      const form = new FormData()
      form.append('image', file)
      this.$http.post(
        `${this.$baseUrl}/image`, 
        form, 
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'authorization': localStorage.getItem('user-token')
        }
      })
      .then(res => {
        const { location } = res.data
        const range = document.createRange()
        range.selectNode(this.imageSelection.commonAncestorContainer)
        const fragment = range.createContextualFragment(`<img src="${location}">`)
        this.imageSelection.commonAncestorContainer.parentNode.appendChild(fragment)
        this.toggleLineHelperMenu()
      })
      .catch(() => console.log('error'))
    },
    runEventOnlyOnBlog(selection) {
      const selectionKey = selection.focusNode.parentNode.offsetParent.getAttribute('data-key') || selection.focusNode.getAttribute('data-key') || selection.focusNode.offsetParent.getAttribute('data-key')
      const key = this.$refs['blog-content'].getAttribute('data-key')
      return selectionKey == key
    },
    onMouseup() {
      const selection = document.getSelection()
      if(this.runEventOnlyOnBlog(selection)) this.imageSelection = selection.getRangeAt(0)
      this.toggleLineHelper(selection)
      this.showEditHelper(selection)
    },
    showEditHelper(selection) {
      setTimeout(() => {
        const range = selection.getRangeAt(0)
        if(range.toString()) {
          this.isEditHelper = 'active'
          this.setEditHelperLocation(range)
        }
        else {
          this.isEditHelper = ''
          this.clearEditHelperLocation()
        }
      }, 100)
    },
    toggleLineHelper(selection) {
      this.setEditHelperLocation(selection.getRangeAt(0)) // 해당 메소드를 호출 시 잘 작동하는 원인 불문명
      this.setLineHelperLocation()
    },
    toggleLineHelperMenu() {
      if(this.isLineHelperInActive == 'active') {
        this.isLineHelperMenu = false
        this.isLineHelperInActive = 'inActive';
      } 
      else {
        this.isLineHelperMenu = true
        this.isLineHelperInActive = 'active'
      }
    },
    setEditHelperLocation(range) {
      if(!range.toString()) return // mouseup 시 첫 range 범위 없음
      const rects = range.getClientRects()
      const { offsetWidth, offsetHeight } = this.$refs['edit-helper']
      const { top, left, width } = rects[0]
      this.editHelperTop = top + window.scrollY - (offsetHeight + 15)
      this.editHelperLeft = left - (offsetWidth / 2) + (width / 2)
    },
    setLineHelperLocation() {
      const selection = document.getSelection()
      const node = selection.focusNode
      if(!node.tagName || node.tagName == 'DIV') {
        const newRange = document.createRange()
        newRange.selectNode(node)
        const { top } = newRange.getBoundingClientRect()
        const { left } = this.$refs['blog-content'].getBoundingClientRect()
        this.lineHelperTop = top + scrollY + 5
        this.lineHelperLeft = left - 35 
      }
    },
    // 진짜 꼴보기 싫은 코드다....
    putHrOrPre(exec) {
      setTimeout((() => {
        if(!this.selection) {
          const blog = this.$refs['blog-content']
          blog.focus()
          if(exec == 'insertHorizontalRule') document.execCommand(exec)
          else document.execCommand('formatBlock', false, exec)
        }
        else {
          if(exec == 'insertHorizontalRule') document.execCommand(exec)
          else document.execCommand('formatBlock', false, exec)
        }
        this.toggleLineHelperMenu()
      }), 50)
    }
  }
}
</script>
<style lang="scss" src="@/assets/css/blog-text-editor.scss"></style>
<style lang="scss" src="@/assets/css/blog-text-editor-view.scss"></style>