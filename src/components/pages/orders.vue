<template>
    <div class="">
        <loading :active.sync="isLoading" />
        <table class="table mt-4">
            <thead>
                <tr>
                    <th width="150">購買時間</th>
                    <th>Email</th>
                    <th>購買款項</th>
                    <th width="150">應付金額</th>
                    <th width="150">是否付款</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in orders" :key="item.id">
                    <td>{{ item.create_at | date}}</td>
                    <td>{{ item.user.email }}</td>
                    <td>
                        <ul>
                            <li v-for="product in item.products" :key="product.id">
                                {{ product.title }}：{{ product.qty }}{{ product.unit }}
                            </li>
                        </ul>
                    </td>
                    <td class="text-right">{{ item.total | currency }}</td>
                    <td>
                        <span class="text-success" v-if="item.is_paid">已付款</span>
                        <span v-else>尚未付款</span>
                    </td>
                </tr>
            </tbody>
        </table>
        <!-- 分頁 -->
        <Pager :pager-data="pagination" @changePage="getOrders"></Pager>
    </div>
</template>

<script>
    import Pager from '@/components/pager';

    export default {
        name: "",
        data() {
            return {
                orders: [],
                pagination: {},
                isLoading: false
            };
        },
        components: {
            Pager
        },
        created() {
            const vm = this;
            vm.getOrders();
        },
        methods: {
            getOrders(page = 1) {
                const vm = this,
                    api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/orders?page=${page}`;
                vm.isLoading = true;
                this.$http.get(api).then((response) => {
                    vm.orders = response.data.orders;
                    vm.pagination = response.data.pagination;
                    vm.isLoading = false;
                });
            }
        }
    };
</script>

<style scoped>
</style>
