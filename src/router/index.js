import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/dashboard'
import Login from '@/components/pages/login'
import Products from '@/components/pages/products'
import Orders from '@/components/pages/orders'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '*',
            redirect: '/login'
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
                }
            ]
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        }

    ]
})
