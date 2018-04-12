<template>
  <div class="hello">
    <h3>{{article.a_title}}</h3>
    <br>
    <div class="author">作者: {{article.u_name}}</div>
    <p class="content">{{article.a_content}}</p>
    <br><br>

    <!--公共留言区-->
    <p>留言角</p><hr>
    <div v-for="item in comments" class="comment-public">
      <p class="comment-user">{{item.u_name}}</p><span class="comment-time">{{item.comment_time}}</span>
      <p class="comment-content">{{item.comment_content}}</p>
    </div>
    <!--公共留言区-->

    <!--我要留言区-->
    <br>
    <input type="button" value="我要留言" @click="showComment = !showComment">

    <div v-show="showComment" class="comment-wrapper">
      <textarea v-model="content" name="content" id="content" cols="50" rows="5" placeholder="写点什么"></textarea>
      <br><br>
      <input @click="submitComment()"
        class="comment-submit-btn" type="button" value="提交">
      <input @click="showComment = false"
        class="comment-cancel-btn" type="button" value="取消">
    </div>
    <br><br>
    <!--我要留言区-->

  </div>
</template>

<script>
  import moment from 'moment'
  import { mapGetters } from 'vuex'

export default {
  name: 'articleDetail',
  mounted(){
    getArticleDetail.call(this);
  },
  computed: {
    ...mapGetters([
      'userId',
      'userName'
    ])
  },
  data () {
    return {
      article:{},
      showComment: false,
      content: '',
      comments:[]
    }
  },
  methods: {
    submitComment(){
      this.$http.post('/submitComment', {
        'articleId': this.article.a_id,
        'userId': this.userId,
        'userName': this.userName,
        'content': this.content,
        'time': moment().format('YYYY-MM-DD HH:MM:SS')
      })
        .then(result => {
         console.log(result.info);
         return Promise.resolve()
        })
        .then(result => {
          //评论成功后刷新留言
          this.getComment();
          //清空评论
          this.content = '';
        })
        .catch(err => {
          throw err
        })
    },

    getComment(){
      this.$http.post('/getComment',{
        'articleId': this.article.a_id
      })
        .then(result => {
          if(result.state){
            this.comments = result.comments
          }
        })
        .catch(err => {
          console.log('获取留言错误',err)
        })
    }
  }
}

function getArticleDetail() {
  this.$http.post("/checkArticle",{
    articleId : this.$route.query.a_id
  })
    .then( res => {
      if(res.state){
        this.article = res.detail

        return Promise.resolve()
      }
    })
    .then(result => {
      this.getComment();
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
  .comment-submit-btn{
    float: left;
    margin-right: 20px;
  }
  .comment-cancel-btn{
    float: left;
  }
  .comment-public{
    background: #f8f8f8;
    padding: 20px 10px;
    border-bottom: 1px solid #ddd;
  }
  .comment-content{
    margin-bottom: 0;
  }
  .comment-user{
    display: inline-block;
    margin: 0;
    font-size: 18px;
  }
  .comment-time{
    color: #999;
    font-size: 13px;
    margin-left: 10px;
  }
</style>
