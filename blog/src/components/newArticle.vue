<template>
  <div class="hello">
    <h3>写文章</h3>
    <input v-model="title" type="text" placeholder="输入标题">
    <textarea v-model="content" name="content" id="content" cols="30" rows="10" placeholder="写点什么"></textarea>
    <br>
    <input type="button" value="发布" @click="submit">
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

export default {
  name: 'newArticle',
  computed: {
    ...mapGetters([
      'access_token',
      'address',
      'email',
      'tel',
      'userId',
      'userName'
    ])
  },
  data () {
    return {
      title:'',
      content: ''
    }
  },
  methods: {
    submit() {
      this.$http.post('/newArticle',{
        'title':this.title,
        'content':this.content,
        "userId": this.userId,
        "userName": this.userName
      })
        .then( res => {
            if(res.state){
              alert(res.text)
            }
        })
    }
  }
}
</script>

<style scoped>
  textarea{
    margin-top: 20px;
    resize: none;
  }
</style>
