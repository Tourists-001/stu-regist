<template>
  <div style="height: 100%;">
    <!-- 头部 -->
    <div class="header-container clear">
      <router-link class="login-container" to="/main">
        <img src="@/static/img/logo.png" alt="" />
      </router-link>
      <div id="userInfo" class="user-info">{{username}}</div>
    </div>
    <!-- 侧边栏 -->
    <div class="nav-container">
      <router-link tag="div" to="/main/stulist" data="studentList" class="nav-item">学生列表</router-link>
      <router-link tag="div" to="/main/addStu" data="addStudentList" class="nav-item">新增学生</router-link>
      <router-link tag="div" to="/main/searchStu" data="findStudentLIst" class="nav-item">查找学生</router-link>
    </div>
    <!-- 主体内容 -->
    <div class="main-container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: ''
    }
  },
  created() {
    this.username = localStorage.getItem('username');
  }
};
</script>

<style>
/* vue-loader */
/* 只针对当前组件有效 */
@import url(../static/css/main.css);
/* css */
.router-link-exact-active {
    background-color: rgb(17, 96, 185);
}
</style>