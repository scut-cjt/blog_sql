<template>
  <div class="hello">
    <h3>home</h3>
    <div class="user-info">
      <ul>
        <li>你好 {{userInfo.userName}}</li>
        <li>邮箱 {{userInfo.email}}</li>
        <li>位置 {{userInfo.address}}</li>
        <li>电话 {{userInfo.tel}}</li>
      </ul>
    </div>

    <input type="button" value="写文章" @click="go2NewArticle">
    <hr>
    <h3>发现</h3>
    <ul>
      <li v-for="item in list" @click="checkArticle(item.a_id)">
        <div class="item">
          <div class="item-head">
            <p class="title">{{item.a_title}}</p>
            <span class="date">{{item.a_date}}</span><br>
          </div>
          <div>
            <p class="content">{{item.a_content | cutContent}}</p>
          </div>
          <div>
            <p class="author">作者  {{item.u_name}}</p>
            <span class="date">评论  {{item.count}}</span>
          </div>
        </div>
      </li>
    </ul>

  </div>
</template>

<script>
import ls from '../util/ls';

export default {
  name: 'home',
  mounted () {
    getUserInfo.call(this)
    getArticleList.call(this)
  },
  data () {
    return {
      userInfo: {},
      list: []
    }
  },
  filters:{
    cutContent(val){
      if(val.length >= 50){
        return val.substr(0,50)+'...'
      }
      return val
    }
  },
  methods: {
    go2NewArticle(){
      console.log('正在跳转至写文章')
      this.$router.push('/newArticle')
    },
    //查看文章详情
    checkArticle(articleId){
      this.$router.push(`/article?a_id=${articleId}`)
    }
  }
}

function getUserInfo() {
  this.userInfo = ls.get('userInfo');
}

function getArticleList() {
  this.$http.post('/getArticleList')
    .then(res => {
        this.list = res.list
    })
}

</script>

<style scoped>
  hr{
    margin: 20px 0;
  }
  .user-info ul{
    padding-left: 20px;
  }
  li{
    list-style: none
  }

  .title{
    flex: 1;
    font-size: 16px;
    display: inline-block;
  }
  .date{
    color:#999;
    font-size:12px;
    margin: 0 10px;
  }
  .author{
    color: #999;
    font-size: 12px;
    display: inline-block;
  }

  ul{
    padding: 0;
  }
  .item p{
    margin: 5px 0;
  }
  .item{
    padding: 5px 0 ;
    border-bottom: 1px solid #ddd;
  }
  .content{
    font-size: 15px;
    color: #666;
  }
  .item-head{
    display: flex;
    align-items: center;
  }
</style>
