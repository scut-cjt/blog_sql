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
  </div>
</template>

<script>
import qs from 'qs';

export default {
  name: 'home',
  mounted () {
    getUserInfo(this)
  },
  data () {
    return {
      userInfo: null,
    }
  },
  methods: {
    go2NewArticle(){
      console.log('正在跳转至写文章')
      this.$router.push('/newArticle')
    }
  }
}

function getUserInfo(vm) {
  vm.userInfo = JSON.parse( window.localStorage.getItem('userInfo') );
}
</script>

<style scoped>
  ul{
    padding-left: 20px;
  }
  li{
    list-style: none
  }
</style>
