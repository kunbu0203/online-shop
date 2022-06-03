import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/dashboard'
import Login from '@/components/pages/login'
import Products from '@/components/pages/products'
import Orders from '@/components/pages/orders'
import Coupons from '@/components/pages/coupons'
import DashboardFront from '@/components/dashboardFront'
import List from '@/components/pages/shoppingList'
import Detail from '@/components/pages/productDetail'
import Checkout from '@/components/pages/checkout'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '*',
            redirect: '/login'
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/admin',
            name: 'Dashboard',
            component: Dashboard,
            children: [
                {
                    path: 'products',
                    name: 'Products',
                    component: Products,
                    meta: { requiresAuth: true }
                },
                {
                    path: 'orders',
                    name: 'Orders',
                    component: Orders,
                    meta: { requiresAuth: true }
                },
                {
                    path: 'coupons',
                    name: 'Coupons',
                    component: Coupons,
                    meta: { requiresAuth: true }
                }
            ]
        },
        {
            path: '/list',
            component: DashboardFront,
            children: [
                {
                    path: '',
                    name: 'List',
                    component: List
                },
                {
                    path: 'detail/:id',
                    name: 'Detail',
                    component: Detail
                },
                {
                    path: '/checkout',
                    name: 'Checkout',
                    component: Checkout
                }
            ]
        }
    ]
})
