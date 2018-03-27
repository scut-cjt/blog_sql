<template>
  <div class="hello">
    <div class="login">
      <h1>login</h1>
      <input v-model="login.userName" name="userName" type="text" placeholder="请输入用户名"><br><br>
      <input v-model="login.passWord" name="passWord" type="password" placeholder="请输入密码"><br><br>
      <input @click="submit" type="button" value="确定">

    </div>

    <div class="register">
      <h1>register</h1>

        <input name="userName" type="text" placeholder="请输入用户名"><br><br>
        <input name="passWord" type="password" placeholder="请输入密码"><br><br>
        <input @click="register" type="button" value="注册">

    </div>

  </div>
</template>

<script>
  import qs from 'qs';

export default {
  name: 'HelloWorld',
  data () {
    return {
      login:{
        userName:'',
        passWord:''
      }
    }
  },
  methods: {
    submit(){

      this.$http.post(PATH+"/login",qs.stringify({
        'userName':this.login.userName,
        'passWord':this.login.passWord
      }))
      .then( res => {
        console.log(res);
      }, err => {
        throw err
      })
    },
    register(){

    }
  }
}
</script>

<style scoped>
  .login,
  .register{
    display: inline-block;
    margin: 2rem
  }
</style>
