// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import Loading from 'vue-loading-overlay'
import jQuery from 'jquery'
window.$ = window.jQuery = jQuery
import 'vue-loading-overlay/dist/vue-loading.css'
import 'bootstrap'
import { ValidationObserver, ValidationProvider, extend, localize, configure } from 'vee-validate'
import TW from 'vee-validate/dist/locale/zh_TW.json'
import * as rules from 'vee-validate/dist/rules'

import VueAxios from 'vue-axios'
import router from './router'
import './bus'
import currencyFilters from './filters/currency'
import dateFilters from './filters/date'

Vue.config.productionTip = false

Vue.use(VueAxios, axios)
axios.defaults.withCredentials = true;

Object.keys(rules).forEach((rule) => {
    extend(rule, rules[rule]);
});

localize('zh_TW', TW);

Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)

configure({
    classes: {
        valid: 'is-valid',
        invalid: 'is-invalid'
    }
});

Vue.component('Loading', Loading);
Vue.filter('currency', currencyFilters);
Vue.filter('date', dateFilters);

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