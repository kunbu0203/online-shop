<template>
    <div class="">
        <loading :active.sync="isLoading" />
        <div class="text-right mt-4">
            <button class="btn btn-primary" @click="openModal('add', tempCoupon)">
                建立新的優惠券
            </button>
        </div>
        <table class="table mt-4">
            <thead>
                <tr>
                    <th>名稱</th>
                    <th>折扣百分比</th>
                    <th>到期日</th>
                    <th>是否啟用</th>
                    <th>編輯</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in coupons" :key="item.id">
                    <td>{{ item.title }}</td>
                    <td>{{ item.percent }}%</td>
                    <td>{{ item.due_date | date }}</td>
                    <td>
                        <span class="text-success" v-if="item.is_enabled">啟用</span>
                        <span v-else>未啟用</span>
                    </td>
                    <td>
                        <button class="btn btn-outline-primary btn-sm" @click="openModal('edit', item)">
                            編輯
                        </button>
                        <button class="btn btn-outline-danger btn-sm" @click="openModal('del', item)">
                            刪除
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
        <!-- 分頁 -->
        <Pager :pager-data="pagination" @changePage="getCoupons"></Pager>
        <!-- popup -->
        <div class="modal fade" id="couponModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content border-0">
                    <div class="modal-header bg-dark text-white">
                        <h5 class="modal-title" id="exampleModalLabel">
                            <span>新增優惠券</span>
                        </h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="title">標題</label>
                            <input type="text" class="form-control" id="title" placeholder="請輸入標題" v-model="tempCoupon.title" />
                        </div>
                        <div class="form-group">
                            <label for="title">優惠碼</label>
                            <input type="text" class="form-control" id="title" placeholder="請輸入優惠碼" v-model="tempCoupon.code" />
                        </div>
                        <div class="form-group">
                            <label for="title">到期日</label>
                            <input type="text" class="form-control" id="title" placeholder="請輸入到期日" v-model="tempDate" />
                        </div>
                        <div class="form-group">
                            <label for="title">折扣百分比</label>
                            <input type="text" class="form-control" id="title" placeholder="請輸入折扣百分比" v-model="tempCoupon.percent" />
                        </div>
                        <div class="form-group">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="is_enabled" v-model="tempCoupon.is_enabled" :true-value="1" :false-value="0" />
                                <label class="form-check-label" for="is_enabled">
                                    是否啟用
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">
                            取消
                        </button>
                        <button type="button" class="btn btn-primary" @click="updateCoupon()">
                            確認
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="delCouponModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content border-0">
                    <div class="modal-header bg-danger text-white">
                        <h5 class="modal-title" id="exampleModalLabel">
                            <span>刪除優惠券</span>
                        </h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        是否刪除
                        <strong class="text-danger">{{ tempCoupon.title }}</strong>
                        優惠券(刪除後將無法恢復)。
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">
                            取消
                        </button>
                        <button type="button" class="btn btn-danger" @click="updateCoupon()">
                            確認刪除
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Pager from '@/components/pager';

    export default {
        name: "",
        data() {
            return {
                coupons: [],
                tempCoupon: {
                    title: '',
                    is_enabled: 0,
                    percent: 100,
                    due_date: Math.floor(new Date() / 1000),
                    code: '',
                },
                tempDate: new Date(),
                modalType: '',
                pagination: {},
                isLoading: false
            };
        },
        components: {
            Pager
        },
        created() {
            const vm = this;
            vm.getCoupons();
        },
        watch: {
            tempDate() {
                const vm = this,
                    timestamp = Math.floor(new Date(vm.tempDate) / 1000);
                vm.tempCoupon.due_date = timestamp;
            }
        },
        methods: {
            getCoupons(page = 1) {
                const vm = this,
                    api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupons?page=${page}`;
                vm.isLoading = true;
                this.$http.get(api).then((response) => {
                    // console.log(response.data);
                    vm.coupons = response.data.coupons;
                    vm.pagination = response.data.pagination;
                    vm.isLoading = false;
                });
            },
            openModal(type, item) {
                const vm = this;
                let modalName = "#couponModal";
                if (type === "del") {
                    modalName = "#delCouponModal";
                }

                if (type === 'add') {
                    vm.tempCoupon = {
                        title: '',
                        is_enabled: 0,
                        percent: 100,
                        due_date: Math.floor(new Date() / 1000),
                        code: '',
                    };
                } else {
                    vm.tempCoupon = Object.assign({}, item);
                }

                vm.tempDate = new Date(vm.tempCoupon.due_date * 1000).toLocaleDateString();
                vm.modalType = type;
                $(modalName).modal("show");
            },
            updateCoupon() {
                const vm = this;
                let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`,
                    apiMethod = "post",
                    modalName = "#couponModal";

                switch (vm.modalType) {
                    case "add":
                        api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon`;
                        break;
                    case "edit":
                        apiMethod = "put";
                        break;
                    case "del":
                        apiMethod = "delete";
                        modalName = "#delCouponModal";
                        break;
                    default:
                        break;
                }

                this.$http[apiMethod](api, { data: vm.tempCoupon }).then((response) => {
                    if (response.data.success) {
                        $(modalName).modal("hide");
                        vm.getCoupons();
                    }
                });
            }
        },
    };
</script>