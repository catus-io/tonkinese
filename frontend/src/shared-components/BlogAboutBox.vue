<template>
  <div id="blog-about-box">
    <div class="card" v-cloak>
      <img class="card-img-top" :src="image">
      <div class="card-body">
        <h5 class="card-title">{{ nickName }}</h5>
        <p class="card-text">
          {{ email }}
        </p>
        <h5 class="card-title">Skill</h5>
        <ul class="list-group list-group-flush">
          <li v-for="(skill, index) in skill" :key="index" class="list-group-item" v-if="3 > index">
            {{ skill }}
          </li>
          <li class="list-toggle-button" v-if="!isOpen">
            <font-awesome-icon v-if="!isOpen" @click="toggleMoreSkill" icon="ellipsis-h" />
          </li>
          <li v-for="(skill, index) in skill" :key="index" class="list-group-item" v-if="3 <= index" v-show="isOpen">
            {{ skill }}
          </li>
          <li class="list-toggle-button">
            <font-awesome-icon v-if="isOpen" @click="toggleMoreSkill" icon="chevron-up" />
          </li> 
        </ul>
        <h5 class="card-title">Comment</h5>
        <div>{{ comment }}</div>
        <div class="card-body">
          <ul class="list-group list-group-flush list-inline about-social">
            <li v-for="(social, index) in socials" :key="index" v-if="social.url">
              <a :href="social.url">
                <font-awesome-icon :icon="[iconPrefix, social.name] " size="lg" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'blog-about-box',
  components: {
  },
  data() {
    return {
      isOpen: false,
    }
  },
  props: {
    image: {
      type: String,
    },
    nickName: {
      type: String
    },
    email: {
      type: String
    },
    skill: {
      type: Array
    },
    comment: {
      type: String
    },
    socials: {
      type: Array
    },
  },
  computed: {
    iconPrefix() {
      return 'fab'
    },
  },
  methods: {
    toggleMoreSkill() {
      this.isOpen = !this.isOpen
    }
  },
}
</script>
<style lang="scss" src="@/assets/css/blog-about.scss"></style>