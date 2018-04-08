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
  import qs from 'qs';

export default {
  name: 'newArticle',
  mounted(){
    console.log('vuex',this.$store.state.user)
  },
  data () {
    return {
      title:'',
      content: ''
    }
  },
  methods: {
    submit() {
      this.$http.post(PATH + '/newArticle',qs.stringify({
        'title':this.title,
        'content':this.content,
        "userId": this.$store.state.user.userId,
        "userName": this.$store.state.user.userName
      }))
        .then( res => {
            if(res.data.state){
              alert(res.data.text)
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
