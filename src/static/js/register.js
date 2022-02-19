(function () {
  var checkStatus = null;
  /* 程序入口 */
  var init = function () {
    initEvents();
  }



  /* 事件入口函数 */
  var initEvents = function () {
    userName.addEventListener('focus', onUserNameFocus)
    userName.addEventListener('blur', onUserNameBlur)
    registerForm.addEventListener('submit', onRegisterFormSubmit)
  }

  /* 表单提交 */
  var onRegisterFormSubmit = function (e) {
    e.preventDefault()
    /* 数据的收集 */
    /* TODO 前端验证 */
    if (checkStatus) {
      window.alert(checkStatus)
      return
    }
    /* 接口的调用 */
    ajax({
      url: 'https://api.duyiedu.com/api/student/stuRegister', // 跟后端通信的地址，找到后端
      type: 'POST', // 后端告诉我写的
      params: {    // 给后端的内容
        appkey: 'alan_1627900246598',
        account: userAccount.value,
        username: userName.value,
        password: userPassword.value,
        rePassword: confirmPassword.value
      },
      success: function (res) {  // 获取后端数据的回调函数
        res = JSON.parse(res)
        window.alert(res.msg)
        if(res.status === 'success') {
          window.location.href = '../login/login.html'
        }
      }
    })
  }

  /* 用户名获得焦点事件函数 */
  var onUserNameFocus = function () {
    promptTxt.style.display = 'block'
    errorTipMsg.style.display = 'none'
    this.className = ''
    checkStatus = null
  }
  /* 用户名失去焦点事件函数 */
  var onUserNameBlur = function () {
    promptTxt.style.display = 'none'
    this.value = this.value.replace(/\s/g, '')
    if (!this.value) return
    /* 做验证
      不能为纯数字
      不能超过14位数
      一个汉字可以看作是2个字符
    */
    /* 用户名的检测 */
    checkStatus = checkedUserName(this.value)
    if (checkStatus) {
      errorTipMsg.style.display = 'block'
      errorTipMsg.innerHTML = checkStatus
      this.className = 'error-inp'
    }
  }

  /* 检测用户名的规则函数 */
  var checkedUserName = function (str) {
    var total = 0;
    var ruleReg = /[a-zA-Z0-9_\u4e00-\u9fa5]/
    var chineseReg = /[\u4e00-\u9fa5]/;

    for (var i = 0; i < str.length; i++) {
      if (!ruleReg.test(str[i])) return '输入字符不合法，请输入数字字母以及汉字'
      chineseReg.test(str[i]) ? total += 2 : total += 1
    }
    switch (true) {
      case !!Number(str):
        return '不能是纯数字'
      case total > 14:
        return '用户名超出14个英文字符或7个汉字'
      default:
        return ''
    }
  }

  init();
})()