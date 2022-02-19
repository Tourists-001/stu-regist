<template>
  <div class="lw">
    <div class="login-container">
      <div class="logo-wrapper">
        <img src="@/static/img/logo.png" alt="" />
      </div>
      <form class="login-form" id="loginForm">
        <input type="text" placeholder="用户名" id="userName" v-model="user.account" />
        <input type="password" placeholder="密码" id="userPassword" v-model="user.password" />
        <div class="btns form-item">
          <input class="login-btn" type="submit" value="登录" @click.prevent="login" />
          <router-link class="switch-register-btn" to="/logon">注册</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            user: {
                account: '',
                password: '',
            }
        }
    },
    methods: {
        async  login() {
            if(this.user.account == '' || this.user.password == '') {
                alert('请输入账号或密码');
            } else {
                const {msg,status} = await this.$api.login(this.user);
                if(status == 'fail') {
                    alert(msg);
                } else {
                    alert(msg)
                    this.$router.push('/main')
                }
            }
        },
    }

}
</script>

<style scoped src="../static/css/login.css">
/* @import url(../static/css/login.css); */
</style>