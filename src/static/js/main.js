(function () {
  var page = 1;
  var size = 3;
  var totalAmount = 0;  // 数据的总数量
  var obj = {}
  var tempId = null;
  var contentItemLists = document.querySelectorAll('.content-item')
  var navLists = document.querySelectorAll('.nav-item')

  var init = function () {
    /* 数据的获取 */
    initLists();
    initEvents();
  }

  var initEvents = function () {
    /* 分页的点击事件 */
    paginationContainer.addEventListener('click', onPaginationClick);
    /* 向前向后点击事件 */
    document.querySelectorAll('.icon').forEach(function (node) {
      node.addEventListener('click', onArrowClick)
    })
    /* 表格点击事件（编辑，删除） */
    tableContainer.addEventListener('click', onTableContainerClick)
    /* 修改内容事件绑定 */
    updateBtn.addEventListener('click', onUpdateBtnClick)
    /* 事件的绑定 */
    navLists.forEach(function (node, index) {
      node.addEventListener('click', oNavNodeItemClick.bind(node, index))
    })
  }

  /* 导航栏的点击事件 */
  var oNavNodeItemClick = function (index) {
    contentItemLists.forEach(function (node, contentIndex) {
      node.className = contentIndex === index ? 'content-item active' : 'content-item';
      navLists[contentIndex].className = 'nav-item'
    })
    this.className = 'nav-item active'
  }

  /* 表格点击事件函数 */
  var onTableContainerClick = function (e) {
    if (e.target.className === 'edit') {
      editListItem(e.target)
    } else if (e.target.className === 'del') {
      deleteListItem(e.target)
    }
  }

  /* 删除事件函数 */
  var deleteListItem = function (currentNode) {
    var uId = currentNode.getAttribute('uId')
    var isConfirm = window.confirm('确认是否删除')
    if (!isConfirm) return
    ajax({
      url: 'https://api.duyiedu.com/api/student/delBySno',
      params: {
        appkey: "Q_A_Q_1590927055348",
        sNo: uId,
      },
      success: function (res) {
        res = JSON.parse(res)
        window.alert(res.msg)
        // dialogContainer.style.display = 'none'
        // /* 重新进行数据的渲染 */
        if (page * size - size === totalAmount - 1) {
          page -= 1
        }
        initLists()
      },
    })
  }

  /* 发送修改请求函数 */
  var onUpdateBtnClick = function () {
    /* TODO  非空验证 */
    ajax({
      url: "https://api.duyiedu.com/api/student/updateStudent",
      type: "GET",
      params: {
        appkey: "Q_A_Q_1590927055348",
        sNo: tempId,
        name: document.getElementById('name').value,
        sex: sex.value,
        birth: birth.value,
        phone: phone.value,
        address: address.value,
        email: email.value,
      },
      success: function (res) {
        res = JSON.parse(res)
        window.alert(res.msg)
        dialogContainer.style.display = 'none'
        /* 重新进行数据的渲染 */
        initLists()
      },
    })
  }

  /* 编辑函数 */
  var editListItem = function (currentNode) {
    tempId = currentNode.getAttribute('uId')
    for (var key in obj[tempId]) {
      document.getElementById(key) && (document.getElementById(key).value = obj[tempId][key])
    }
    dialogContainer.style.display = 'block'
  }

  /* 分页的箭头的点击事件 */
  var onArrowClick = function () {
    var oldPage = page
    if (this.id === 'previous' && page != 1) {
      page--
    } else if (this.id === 'next' && page != paginationContainer.children.length) {
      page++
    }
    if (oldPage === page) return
    paginationContainer.children[page - 1].click()
  }

  /* 分页的指定页点击事件函数 */
  var onPaginationClick = function (e) {
    // TODOS 判断  判读是否在当前的页面进行点击
    var target = e.target
    if (target.id === 'paginationContainer') return
    page = target.innerHTML
    initLists()
  }

  /* 表格的数据的获取 */
  var initLists = function () {
    ajax({
      url: "https://api.duyiedu.com/api/student/findByPage",
      type: "GET",
      params: {
        appkey: "Q_A_Q_1590927055348",
        page: page,
        size: size,
      },
      success: function (res) {
        res = JSON.parse(res)
        totalAmount = res.data.cont
        /* 渲染表格 */
        renderTableList(res.data.findByPage)
        /* 渲染分页 */
        renderPagination();
      },
    })
  }

  /* 渲染分页函数 */
  var renderPagination = function () {
    var num = Math.ceil(totalAmount / size)
    var arr = [];

    for (var i = 1; i <= num; i++) {
      arr.push('<div class="page-item">' + i + '</div>')
    }

    paginationContainer.innerHTML = arr.join('')
    fillActive()
  }

  /* 添加分页的高亮状态 */
  var fillActive = function () {
    document.querySelectorAll('.page-item').forEach(function (node) {
      node.innerHTML == page && (node.className = 'page-item active')
    })
  }

  /* 渲染表格操作函数 */
  var renderTableList = function (arr) {
    var tempArr = [];

    if (!arr.length) {
      tableContainer.innerHTML = '<tr><td colspan="8">暂无数据</td></tr>'
      return
    }

    arr.forEach(function (item) {
      tempArr.push(
        '<tr>' +
        ' <td>' + item.sNo + '</td>' +
        '<td>' + item.name + '</td>' +
        '<td>' + (item.sex === 0 ? '男' : '女') + '</td>' +
        '<td>' + (new Date().getFullYear() - item.birth) + '</td>' +
        '<td>' + item.phone + '</td>' +
        '<td>' + item.email + '</td>' +
        '<td>' + item.address + '</td>' +
        ' <td> <span uId="' + item.sNo + '" class="edit" index="0">编辑</span> <span uId="' + item.sNo + '" class="del" index="0">删除</span> </td>' +
        '</tr>'
      )
      obj[item.sNo] = item
    })
    tableContainer.innerHTML = tempArr.join('')
  }

  init();
})()