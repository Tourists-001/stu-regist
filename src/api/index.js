import {create} from "axios";
import URLs from './URLs';
const appkey = '1100_1628152415736'

const ajax = create({
    baseURL: URLs.baseURl,
    params: {
        appkey,
    }
})

//注册
const logon = (options) => ajax({
    method: 'post',
    url: URLs.logon,
    params: {
        ...options,
    }
})
//登录
const login = (options) => ajax({
    method: 'post',
    url: URLs.login,
    params: {
        ...options,
    }
})
//获取学生
const getStu = (page, size) => ajax({
    method: 'get',
    url: URLs.findByPage,
    params: {
        page,
        size,
    }
})
//修改学生
const updateStu = (options) => ajax({
    method: 'get',
    url: URLs.updateStu,
    params: {
        ...options,
    }
})
//删除学生
const delStu = sNo => ajax({
    method: 'get',
    url: URLs.delStu,
    params: {
        sNo,
    }
})
//添加学生
const addStu = (options) => ajax({
    method: 'get',
    url: URLs.addStu,
    params: {
        ...options,
    }
})
//拦截器
ajax.interceptors.response.use(data => data.data);

export default {
    login,
    logon,
    getStu,
    updateStu,
    delStu,
    addStu,
}