<template>
    <div class="">
        <header class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
            <a class="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">前台</a>
            <div class="navbar-nav">
                <div class="nav-item text-nowrap" @click.stop>
                    <a class="nav-link px-4" href="#" @click.prevent="openCart()">
                        <i class="fas fa-shopping-cart"></i>
                    </a>
                    <div class="cartList shadow p-4" v-if="cartOpen">
                        <Cart></Cart>
                        <router-link class="btn btn-outline-primary btn-block mt-4" :to="{name: 'Form'}">前往結帳</router-link>
                    </div>
                </div>
            </div>
        </header>
    </div>
</template>

<script>
    import Cart from '@/components/cart';

    export default {
        name: "",
        data() {
            return {
                cartOpen: false
            };
        },
        components: {
            Cart
        },
        created() {
            const vm = this;
            document.addEventListener('click', vm.closeCart);
        },
        methods: {
            openCart() {
                const vm = this;
                vm.cartOpen = true;
            },
            closeCart() {
                const vm = this;
                if (vm.cartOpen === true) {
                    vm.cartOpen = false;
                }
            }
        }
    };
</script>

<style scoped>
.nav-link {
    font-size: 1.5em;
}
.navbar-nav {
    position: relative;
}
.cartList {
    position: absolute;
    top: calc(100% + 10px);
    right: 10px;
    width: 500px;
    background-color: #fff;
}
</style>
