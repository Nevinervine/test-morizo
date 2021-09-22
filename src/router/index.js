import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import detail from '@/components/detail'
import error from '@/components/404'
import signUp from '@/components/sign-up'
import signIn from '@/components/sign-in'
import create from '@/components/createPost'
import edit from '@/components/editPost'


Vue.use(Router)

export default new Router({
    mode: "history",
    routes: [
        {
            path: '*',
            redirect: '/404'
        },
        {
            path: '/sign-up',
            name: 'sign-up',
            component: signUp
        },
        {
            path: '/sign-in',
            name: 'sign-in',
            component: signIn
        },
        {
            path: '/',
            name: 'home',
            component: home
        },
        {
            path: '/home',
            name: 'home',
            component: home
        },
        {
            path: '/home/:id',
            component: detail,
            name: 'detail',
            props: true
        },
        {
            path: '/edit/:id',
            component: edit,
            name: 'edit',
            props: true
        },


        {
            path: '/404',
            name: '404',
            component: error
        },
        {
            path: '/create',
            name: 'create',
            component: create
        },
    ]
})
