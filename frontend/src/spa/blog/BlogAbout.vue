<template>
  <div id="blog-about">
    <div class="blog-about-c">
      <blog-about-box
        v-for="(about, index) of memberAbout"
        :key="index"
        :image="about.image"
        :nickName="about.nickName"
        :email="about.email"
        :skill="about.skill"
        :comment="about.comment"
        :socials="about.socials"
      ></blog-about-box>
    </div>
  </div>
</template>
<script>
        // :instagram="about.instagram"
        // :facebook="about.facebook"
        // :twitter="about.twitter"
        // :medium="about.medium"
        // :github="about.github"
        // :youtube="about.youtube"
import BlogAboutBox from '@/shared-components/BlogAboutBox'
export default {
  name: 'blog-about',
  components: {
    'blog-about-box': BlogAboutBox
  },
  data() {
    return {
      memberAbout: {
        image: '',
        nickName: '',
        email: '',
        skill: [],
        comment: '',
        socials: {
          instagram: '',
          facebook: '',
          twitter: '',
          medium: '',
          github: '',
          youtube: ''
        }
      }
    }
  },
  created() {
    this.memberAbout = 
      [
        {
          image: 'https://scontent-icn1-1.xx.fbcdn.net/v/t1.0-1/p160x160/29366254_1692000407532873_7278368192458653696_n.jpg?_nc_cat=104&_nc_ht=scontent-icn1-1.xx&oh=dfbf5784a045dc1aba84a3ab390ed722&oe=5C863F26',
          nickName: 'nerdrun',
          email: 'nerdrun.kai@gmail.com',
          skill: ['javascript', 'NodeJS', 'VueJS', 'MongoDB', 'AWS'],
          comment: '어느 유명 기타리스트의 형에게 인터뷰에서 이런 질문을 했습니다. “동생은 어떻게 그렇게 기타를 잘 연주하게 되었습니까?” 그러자 그는 간단 명료하게 이야기한다. “아침에 출근 전에 기타를 연주하는 모습을 봤는데 집에 왔더니 계속 기타를 연주하고 있었다” 아주 간단한 원리. 지행합일.',
          socials: [
            { name: 'instagram', url: 'https://www.instagram.com/nerdrun' },
            { name: 'facebook', url: 'https://www.facebook.com/nerdrun' },
            { name: 'twitter', url: '' },
            { name: 'medium', url: '' },
            { name: 'github', url: 'https://www.github.com/nerdrun' },
            { name: 'youtube', url: '' },
          ],
        },
        {
          image: 'https://scontent-icn1-1.cdninstagram.com/vp/d891eb338cc318ccc4c237917227e98f/5C50BB3E/t51.2885-19/s320x320/34687892_204130733543709_6680813850742226944_n.jpg',
          nickName: 'Adams',
          email: 'nerdrun.adams@gmail.com',
          skill: ['Javascript', 'NodeJs', 'HTML', 'VueJS', 'MongoDB', 'CSS', 'Bootstrap'],
          comment: '목표를 성취했다는 것은, 다음 목표를 준비하고 있기에 가능한 것이라 믿는다. 나 또한 더 나은 미래를 위해 목표에 목표를 레디할까한다.',
          socials: [
            { name: 'instagram', url: 'https://www.instagram.com/_adams.j' },
            { name: 'facebook', url: '' },
            { name: 'twitter', url: '' },
            { name: 'medium', url: '' },
            { name: 'github', url: 'https://www.github.com/nerdy-adams' },
            { name: 'youtube', url: 'https://www.youtube.com/channel/UC5A-UoCcOwEr4Kq_gfOfl_w' },
          ],
        },
        {
          image: 'https://avatars3.githubusercontent.com/u/31373713?s=460&v=4',
          nickName: 'Jny',
          email: 'nerdrun.jny@gmail.com',
          skill: ['javascript', 'NodeJS', 'VueJS', 'MongoDB', 'AWS'],
          comment: 'hello world',
          socials: [
            { name: 'instagram', url:'' },
            { name: 'facebook', url:'' },
            { name: 'twitter', url:'' },
            { name: 'medium', url:'' },
            { name: 'github', url:'https://github.com/Jny' },
            { name: 'youtube', url:'' },
          ],
        },
      ]
  },
  methods: {
  },
}
</script>
<style lang="scss" src="@/assets/css/blog-about.scss"></style>