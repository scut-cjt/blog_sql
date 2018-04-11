<template>
  <div class="hello">
    <h3>{{article.a_title}}</h3>
    <div class="author">作者: {{article.u_name}}</div>
    <p class="content">{{article.a_content}}</p>
  </div>
</template>

<script>

export default {
  name: 'articleDetail',
  mounted(){
    getArticleDetail.call(this)
  },
  data () {
    return {
      article:{}
    }
  },
  methods: {
  }
}

function getArticleDetail() {
  this.$http.post("/checkArticle",{
    articleId : this.$route.query.a_id
  })
    .then( res => {
      if(res.state){
        this.article = res.detail
      }
    })
}
</script>

<style scoped>
  textarea{
    margin-top: 20px;
    resize: none;
  }
  .author{
    color:#999;
    font-size: 14px;
  }
  .content{
    margin: 30px 0;
    text-align: justify;
  }
</style>
