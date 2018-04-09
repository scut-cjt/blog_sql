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
      <li v-for="item in list">
        <div class="item">
          <div>
            <p class="title">{{item.a_title}}</p>
            <span class="date">{{item.a_date}}</span>
          </div>
          <div>
            <p class="author">{{item.u_name}}</p>
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
  methods: {
    go2NewArticle(){
      console.log('正在跳转至写文章')
      this.$router.push('/newArticle')
    }
  }
}

function getUserInfo() {
  this.userInfo = ls.get('userInfo');
}

function getArticleList() {
  this.$http.post(PATH+ '/getArticleList')
    .then(res => {
        this.list = res.data.list
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
    font-size: 16px;
  }
  .date{
    float: right;
    color:#999;
    font-size:12px;
  }
  .author{
    font-size:14px;
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
</style>
