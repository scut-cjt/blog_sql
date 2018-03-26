<template>
  <div class="hello">
    <div class="login">
      <h1>login</h1>

      <form action="/login" method="post">
        <input name="userName" type="text" placeholder="请输入用户名"><br><br>
        <input name="passWord" type="password" placeholder="请输入密码"><br><br>
        <input type="submit" value="确定">
      </form>
    </div>

    <div class="register">
      <h1>register</h1>

      <form action="/register" method="post">
        <input name="userName" type="text" placeholder="请输入用户名"><br><br>
        <input name="passWord" type="password" placeholder="请输入密码"><br><br>
        <input type="submit" value="注册">
      </form>
    </div>

  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
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
