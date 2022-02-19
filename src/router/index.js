import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login.vue';
import Logon from '@/views/logon.vue';
import Main from '@/views/main.vue';
import StuList from '@/components/stulist.vue';
import AddStu from '@/components/AddStu.vue';
import SearchStu from '@/components/searchStu.vue';
import notFound from '@/components/notFound.vue';

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        beforeEnter(to, from, next) {
            const value = localStorage.getItem('username');
            if( value) {
                next('/main')
            } else {
                next('/login')
            }
        }
    },
    {
        path:'/login',
        component: Login,
    },
    {
        path: '/logon',
        component: Logon,
    },
    {
        path: '/main',
        component: Main,
        beforeEnter(to, from, next) {
            const value = localStorage.getItem('username');
            if( value) {
                next()
            } else {
                next('/login')
            }
        },
        redirect: '/main/stulist',
        children:[
            {
                path: 'stulist',
                component: StuList,
            },
            {
                path: 'addStu',
                component: AddStu,
            },
            {
                path: 'searchStu',
                component: SearchStu,
            }
        ]
    },
    {
        path: '/notFound',
        component: notFound,
    },
    {
        path: '*',
        redirect: '/notFound'
    },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
