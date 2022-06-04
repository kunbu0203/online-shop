<template>
    <div>
        <div class="row">
            <div class="col-md-5 order-md-2 mb-4">
                <h4 class="d-flex justify-content-between align-items-center mb-3">
                    <span class="text-muted">訂單內容</span>
                </h4>
                <table class="table">
                    <thead>
                        <th>品名</th>
                        <th>數量</th>
                        <th>單價</th>
                    </thead>
                    <tbody>
                        <tr v-for="item in order.products" :key="item.id">
                            <td class="align-middle">{{ item.product.title }}</td>
                            <td class="align-middle">{{ item.qty }}</td>
                            <td class="align-middle text-right">{{ item.final_total | currency  }}</td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colspan="2" class="text-right">總計</td>
                            <td class="text-right">{{ order.total | currency  }}</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            <div class="col-md-7 order-md-1">
                <h4 class="mb-3">訂單資料</h4>
                <form @submit.prevent="payOrder()">
                    <table class="table">
                        <tbody>
                            <tr>
                                <th width="100">Email</th>
                                <td>{{ order.user.email }}</td>
                            </tr>
                            <tr>
                                <th>姓名</th>
                                <td>{{ order.user.name }}</td>
                            </tr>
                            <tr>
                                <th>收件人電話</th>
                                <td>{{ order.user.tel }}</td>
                            </tr>
                            <tr>
                                <th>收件人地址</th>
                                <td>{{ order.user.address }}</td>
                            </tr>
                            <tr>
                                <th>付款狀態</th>
                                <td>
                                    <span v-if="!order.is_paid">尚未付款</span>
                                    <span v-else class="text-success">付款完成</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="text-right" v-if="order.is_paid === false">
                        <button class="btn btn-danger">確認付款去</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "",
        data() {
            return {
                orderId: '',
                order: {
                    user: {}
                }
            };
        },
        created() {
            const vm = this;
            vm.orderId = vm.$route.params.orderId;
            vm.getOrder();
        },
        methods: {
            getOrder() {
                const vm = this,
                    api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order/${vm.orderId}`;

                this.$http.get(api).then((response) => {
                    vm.order = response.data.order;
                });
            },
            payOrder() {
                const vm = this,
                    api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/pay/${vm.orderId}`;

                this.$http.post(api).then((response) => {
                    if (response.data.success) {
                        vm.getOrder();
                    }
                });
            }
        }
    };
</script>

<style scoped>
.finalTotal {
    margin-top: 2rem;
    font-size: 20px;
    text-align: center;
}

.num {
    display: inline-block;
    min-width: 120px;
    font-size: 28px;
    font-weight: bold;
    text-align: right;
}

.note {
    font-size: 14px;
    color: #ccc;
}

.finalTotal .del {
    color: #dc3545;
}
</style>