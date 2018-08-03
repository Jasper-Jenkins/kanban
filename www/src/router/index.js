import Vue from 'vue'
import Router from 'vue-router'
//@ts-ignore
import Home from '@/components/Home'
//@ts-ignore
import Login from '@/components/Login'
//@ts-ignore
import Board from '@/components/Board'
//@ts-ignore
import Task from '@/components/Task'
//@ts-ignore
import List from '@/components/List'
//@ts-ignore
import Venture from '@/components/Venture'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/venture',
      name: 'Venture',
      component: Venture
    },
   {
    path: '/login',
      name: 'Login',
      component: Login
   },
   {
    path: '/board/:boardId',
      name: 'Board',
      component: Board
   },
   {
    path: '/task',
      name: 'Task',
      component: Task
   },
   {
    path: '/list/',
      name: 'List',
      component: List
   }
  ]
})
