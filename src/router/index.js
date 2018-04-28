import Vue from 'vue'
import Router from 'vue-router'
import user from '@/components/userManage'
import userdetail from '@/components/user/userdetails'
import mainpage from '@/components/mainPage'
import producttype from '@/components/producttype'
import productContent from '@/components/productContent'
import productManage from '@/components/productManage'
Vue.use(Router)

export default new Router({
  mode:'history',
  linkActiveClass:"active",
  routes: [
    {
      path:'/',
      name:'mainpage',
      component:mainpage
    },
    {
      path:'/user',
      name:'user',
      component:user
    },
    {
      path:'/userdetail/:user_id',
      name:'userdetail',
      component:userdetail
    },
    {
      path:'/producttype',//商品类型
      name:'producttype',
      component:producttype
    },
    {
      path:'/productContent',
      name:'productContent',
      component:productContent
    },
    {
      path:'/productManage',//商品管理
      name:'productManage',
      component:productManage
    }

  ]
})
