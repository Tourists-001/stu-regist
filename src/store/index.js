import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/api'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        stuList: [],
        nowPage: 1,
        totalPage: 1,
        size: 1,
        count: 1,
        activeStu: {},
        isShow: false,
    },
    mutations: {
        setShow(state,bool) {
            state.isShow = bool
        },
        setActiveStu(state,list) {
            state.activeStu = list
        },
        setStuList(state, list) {
            state.stuList = list
        },
        setNowPage(state, p) {
            state.nowPage = p;
        },
        setTotalPage(state, count) {
            state.totalPage = Math.ceil(count / state.size);
            state.count = count
        }
    },
    actions: {
        async getStuList({
            commit,
            state
        }, page) {
            const {data: {cont, findByPage}} = await api.getStu(page,state.size);
            commit('setStuList',findByPage);
            commit('setNowPage',page);
            commit('setTotalPage',cont);
        },
        async delStu({dispatch,state}, sNo) {
            await api.delStu(sNo);
            //重新计算总页数
            const newPage = Math.ceil((state.count-1)/state.size);
            if (state.nowPage > newPage) {
                dispatch('getStuList',state.nowPage-1);
            } else {
                dispatch('getStuList', state.nowPage);
            }
        }
    },
    modules: {}
})