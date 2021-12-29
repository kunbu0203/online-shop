import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/dashboard'
import Login from '@/components/pages/login'
import Products from '@/components/pages/products'

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
