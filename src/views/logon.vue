<template>
  <div class="user-register">
    <!-- logo部分 -->
    <router-link class="logo-container" to="/main">
      <img src="@/static/img/logo.png" alt="" />
    </router-link>
    <!-- 宣言部分 -->
    <div class="text-container">
      <h3 class="ft_60">用前端</h3>
      <div class="text-description">让用户有更好的体验</div>
    </div>
    <!-- 表单部分 -->
    <div class="form-container">
      <div class="form-title-container">
        <h3 class="">欢迎注册</h3>
        <div>已有账号？<router-link to="/login">登录</router-link></div>
      </div>
      <form id="registerForm" class="form-body">
        <div class="form-item clear">
          <label for="userName">用户名:</label>
          <input
            type="text"
            id="userName"
            @focus="focusEvent"
            @blur="blurEvent"
            v-model="user.username"
            :class="errClass"
          />
          <!-- tip区域 -->
          <div id="promptTxt" class="prompt-txt" v-show="showPrompt">
            设置后不可更改，中英文均可，最长14个英文或7个汉字
          </div>
          <div class="err-message" id="errorTipMsg">
            {{ errorMsg }}
          </div>
        </div>
        <div class="form-item clear">
          <label for="userAccount">账号:</label>
          <input type="text" id="userAccount" v-model="user.account" />
        </div>
        <div class="form-item clear">
          <label for="userPassword">密码:</label>
          <input type="password" id="userPassword" v-model="user.password" />
        </div>
        <div class="form-item clear">
          <label for="confirmPassword">确认密码:</label>
          <input
            type="password"
            id="confirmPassword"
            v-model="user.rePassword"
          />
        </div>
        <input
          class="register-btn"
          type="submit"
          id="submitBtn"
          value="注册"
          @click.prevent="logon"
        />
      </form>
    </div>
  </div>
</template>

<script>
var checkedUserName = function (str) {
  var total = 0;
  var ruleReg = /[a-zA-Z0-9_\u4e00-\u9fa5]/;
  var chineseReg = /[\u4e00-\u9fa5]/;

  for (var i = 0; i < str.length; i++) {
    if (!ruleReg.test(str[i])) return "输入字符不合法，请输入数字字母以及汉字";
    chineseReg.test(str[i]) ? (total += 2) : (total += 1);
  }
  switch (true) {
    case !!Number(str):
      return "不能是纯数字";
    case total > 14:
      return "用户名超出14个英文字符或7个汉字";
    default:
      return "";
  }
};
export default {
  data() {
    return {
      user: {
        username: "",
        account: "",
        password: "",
        rePassword: "",
      },
      showPrompt: false,
      errorMsg: "",
    };
  },
  computed: {
    errClass() {
      if (this.errorMsg) {
        return "error-inp";
      } else {
        return "";
      }
    },
  },
  methods: {
    async logon() {
      if (this.errorMsg == "") {
        if (
          this.user.username &&
          this.user.account &&
          this.user.password &&
          this.user.rePassword
        ) {
          //发送请求
          const { msg, status } = await this.$api.logon(this.user);
          if (status == "fail") {
            alert(msg);
          } else {
            const falg = confirm("是否登录");
            if (falg) {
            localStorage.setItem('username',this.user.username);
              this.$router.push("/login");
            } else {
              this.user = {
                username: "",
                account: "",
                password: "",
                rePassword: "",
              };
            }
          }
        }
      }
    },
    focusEvent() {
      this.showPrompt = true;
    },
    blurEvent() {
      this.showPrompt = false;
      this.errorMsg = checkedUserName(this.user.username);
    },
  },
};
</script>

<style scoped src="../static/css/register.css">
/* @import url(../static/css/register.css); */
</style>