<template>
  <div class="hello">
    <div class="login">
      <h1>login</h1>

      <input name="userName" type="text" placeholder="请输入用户名"><br><br>
      <input name="passWord" type="password" placeholder="请输入密码"><br><br>
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
export default {
  name: 'HelloWorld',
  data () {
    return {
    }
  },
  methods: {
    submit(){
      console.log(PATH+"/test")
      this.$http.get(PATH+"/test").then( res => {
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
