<template>
    <div class="">
        <header class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
            <a class="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">買買買</a>
            <!-- <button class="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button> -->
            <div class="navbar-nav">
                <div class="nav-item text-nowrap" @click.stop>
                    <a class="nav-link px-4" href="#" @click.prevent="openCart()">
                        <i class="fas fa-shopping-cart"></i>
                    </a>
                    <ul class="list-group shadow" v-if="cartOpen">
                        <li class="list-group-item d-flex justify-content-between lh-condensed">
                            <table class="table table-sm mb-0">
                                <thead>
                                    <tr>
                                        <th width="40px"></th>
                                        <th>品名</th>
                                        <th width="80px">數量</th>
                                        <th width="100px">單價</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="item,index in carts" :key="index">
                                        <td>
                                            <a class="px-2" href="#" @click.prevent="delCart(item.id)">
                                                <i class="fas fa-trash-alt"></i>
                                            </a>
                                        </td>
                                        <td>{{ item.product.title }}</td>
                                        <td>{{ item.qty }}</td>
                                        <td>{{ item.total }}</td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td>總計</td>
                                        <td>{{ total }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    </div>
</template>

<script>
    export default {
        name: "",
        data() {
            return {
                carts: [],
                cartOpen: false,
                total: 0
            };
        },
        created() {
            document.addEventListener('click', this.closeCart);
        },
        methods: {
            openCart() {
                const vm = this;
                vm.updateCart();
                vm.cartOpen = true;
            },
            closeCart() {
                const vm = this;
                if (vm.cartOpen === true) {
                    vm.cartOpen = false;
                }
            },
            updateCart() {
                const vm = this,
                    api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;

                this.$http.get(api).then((response) => {
                    vm.carts = response.data.data.carts;
                    vm.total = response.data.data.total;
                });
            },
            delCart(id) {
                const vm = this,
                    api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${id}`;

                this.$http.delete(api).then((response) => {
                    if (response.data.success) {
                        vm.$bus.$emit("message:push", response.data.message);
                        vm.updateCart();
                    }
                });
            },
            useCoupon() {

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
.list-group {
    position: absolute;
    top: calc(100% + 10px);
    right: 10px;
    width: 500px;
}
</style>
