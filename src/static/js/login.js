(function () {

  var init = function () {
    initEvents();
  }

  /* 事件绑定函数 */
  var initEvents = function () {
    loginForm.addEventListener('submit', onLoginFormSubmit)
  }
  /* 用户注册 */
  var onLoginFormSubmit = function (e) {
    e.preventDefault()
    if (!userName.value.trim() || !userPassword.value.trim()) {
      window.alert("用户名或密码不能为空")
      return
    }
    // 发送请求
    ajax({
      url: 'https://api.duyiedu.com/api/student/stuLogin', // 商店的地址
      type: "POST",   // 怎么去到这个商店，骑车，坐车
      params: {     // 我要给售货员钱
        appkey: 'alan_1627900246598',
        account: userName.value,
        password: userPassword.value,
      },
      success: function (res) {    // 他给我商品
        res = JSON.parse(res)   // 拿到这双鞋，打开包装

        window.alert(res.msg)
        if (res.status === 'success') {
          window.location.href = '../main/main.html?name=' + userName.value
        }
      }
    })
  }

  init();
})()