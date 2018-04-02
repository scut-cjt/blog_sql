<template>
  <div class="hello">
    <div class="login">
      <h3>login</h3>
      <input v-model="login.userName" name="userName" type="text" placeholder="请输入用户名"><br><br>
      <input v-model="login.passWord" name="passWord" type="password" placeholder="请输入密码"><br><br>
      <input @click="submit" type="button" value="确定">

    </div>

    <div class="register">
      <h3>register</h3>
      <input v-model="register.userName" name="userName" type="text" placeholder="请输入用户名"><br><br>
      <input v-model="register.passWord" name="passWord" type="password" placeholder="请输入密码"><br><br>
      <input @click="handleRegister" type="button" value="确定">

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
      },
      register:{
        userName:'',
        passWord:''
      },
    }
  },
  methods: {
    submit(){

      this.$http.post(PATH+"/login",qs.stringify({
        'userName':this.login.userName,
        'passWord':this.login.passWord
      }))
      .then( res => {
        let result = res.data
        console.log(result);
        if(result.state){
          window.localStorage.setItem('access_token',result.token);
        }
      }, err => {
        throw err
      })
    },
    handleRegister(){
      this.$http.post(PATH+"/register",qs.stringify({
        'userName':this.register.userName,
        'passWord':this.register.passWord
      }))
        .then( res => {
          console.log(res);
        }, err => {
          throw err
        })
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
