// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import 'bootstrap'

import VueAxios from 'vue-axios'
import router from './router'
import './bus'
import currencyFilters from './filters/currency'

Vue.config.productionTip = false

Vue.use(VueAxios, axios)
axios.defaults.withCredentials = true;

Vue.component('Loading', Loading);
Vue.filter('currency', currencyFilters)

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth) {
        // console.log('這裡需要驗證')
        const api = `${process.env.APIPATH}/api/user/check`;
        axios.post(api).then((response) => {
            // console.log(response.data)
            if (response.data.success) {
                next();
            } else {
                next({
                    path: '/login'
                });
            }
        })
    } else {
        next();
    }
})