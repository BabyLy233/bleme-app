import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'
import User from '@/views/User'
import Login from '@/views/user/Login'
import Register from '@/views/user/Register'
import Cart from '@/views/Cart'
import Order from '@/views/Order'
import Shop from '@/views/shop/Shop'
import AddressManager from '@/views/user/AddressManager'
import AddAddress from '@/views/user/AddAddress'
import EditAddress from '@/views/user/EditAddress'
import EditPassword from '@/views/user/EditPassword'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
  },
  {
    path: '/user',
    name: 'User',
    component: User,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart,
  },
  {
    path: '/order',
    name: 'Order',
    component: Order,
  },
  {
    path: '/shop',
    name: 'Shop',
    component: Shop,
  },
  {
    path: '/user/address',
    name: 'Address',
    component: AddressManager,
  },
  {
    path: '/user/address/add',
    name: 'AddAddress',
    component: AddAddress,
  },
  {
    path: '/user/address/edit',
    name: 'EditAddress',
    component: EditAddress,
  },
  {
    path: '/user/edit_password',
    name: 'EditPassword',
    component: EditPassword,
  },
]

const router = new VueRouter({
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login' || to.path === '/register' || to.path === '/home'
    || to.path === '/user' || to.path === '/order' || to.path === '/cart') {
    next()
    return
  }

  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) {
    next('/login')
    return
  }
  next()
})

export default router
