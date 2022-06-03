<template>
    <div>
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
                <tr v-for="item,index in data.carts" :key="index">
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
                    <td>{{ data.total }}</td>
                </tr>
                <!-- <tr>
                    <td></td>
                    <td></td>
                    <td>折扣價<br>(使用折扣碼：{{ data.carts[0].coupon.code }})</td>
                    <td>{{ data.final_total }}</td>
                </tr> -->
            </tbody>
        </table>
    </div>
</template>

<script>
    export default {
        name: "",
        data() {
            return {
                data: [],
                // couponCode: ''
            };
        },
        created() {
            this.updateCart();
        },
        methods: {
            updateCart() {
                const vm = this,
                    api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;

                this.$http.get(api).then((response) => {
                    vm.data = response.data.data;
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
            // useCoupon() {
            //     const vm = this,
            //         api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/coupon`;

            //     this.$http.post(api, { data: { code: vm.couponCode} }).then((response) => {
            //         if (response.data.success) {
            //             vm.updateCart();
            //         }
            //         vm.$bus.$emit("message:push", response.data.message);
            //     });
            // }
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
