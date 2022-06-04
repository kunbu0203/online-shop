<template>
    <div>
        <div class="row">
            <div class="col-md-5 order-md-2 mb-4">
                <h4 class="d-flex justify-content-between align-items-center mb-3">
                    <span class="text-muted">購物車</span>
                </h4>
                <Cart :show-final="usingCode" @delCart="getTotal()" ref="cart"></Cart>
                <div class="input-group mt-2">
                    <input type="text" class="form-control" v-model="couponCode" placeholder="請輸入優惠代碼">
                    <div class="input-group-append">
                        <a href="#" class="btn btn-secondary" @click.prevent="getCoupon()">使用優惠券</a>
                    </div>
                </div>
                <div class="finalTotal d-flex justify-content-between align-items-end">
                    <div>
                        總計
                        <span class="note" v-if="usingCode">
                            (已使用優惠券:{{usingCode}})
                            <a href="#" class="del" @click.prevent="delCoupon()">
                                <i class="far fa-times"></i>
                            </a>
                        </span>
                    </div>
                    <div class="num">{{ finalTotal | currency }}</div>
                </div>
            </div>
            <div class="col-md-7 order-md-1">
                <h4 class="mb-3">請填寫基本資料</h4>
                <validation-observer v-slot="{ invalid }">
                    <form @submit.prevent="createOrder()">
                        <div class="form-group">
                            <validation-provider rules="required|email" v-slot="{ errors, classes }">
                                <!-- 輸入框 -->
                                <label for="email">Email</label>
                                <input type="email" class="form-control" name="email" id="email" v-model="form.user.email" placeholder="輸入Email" :class="classes">
                                <!-- 錯誤訊息 -->
                                <span class="invalid-feedback">{{ errors[0] }}</span>
                            </validation-provider>
                        </div>
                        <div class="form-group">
                            <validation-provider rules="required" v-slot="{ errors, classes }">
                                <label for="username">收件人姓名</label>
                                <input type="text" class="form-control" name="name" id="username" v-model="form.user.name" placeholder="輸入收件人姓名" :class="classes">
                                <span class="invalid-feedback">{{ errors[0] }}</span>
                            </validation-provider>
                        </div>
                        <div class="form-group">
                            <validation-provider rules="required|numeric" v-slot="{ errors, classes }">
                                <label for="usertel">收件人電話</label>
                                <input type="tel" class="form-control" id="usertel" v-model="form.user.tel" placeholder="請輸入電話" :class="classes">
                                <span class="invalid-feedback">{{ errors[0] }}</span>
                            </validation-provider>
                        </div>
                        <div class="form-group">
                            <validation-provider rules="required" v-slot="{ errors, classes }">
                                <label for="useraddress">收件人地址</label>
                                <input type="text" class="form-control" name="address" id="useraddress" v-model="form.user.address" placeholder="請輸入地址" :class="classes">
                                <span class="invalid-feedback">{{ errors[0] }}</span>
                            </validation-provider>
                        </div>
                        <div class="form-group">
                            <label for="comment">留言</label>
                            <textarea name="" id="comment" class="form-control" cols="30" rows="10" v-model="form.message"></textarea>
                        </div>
                        <div class="mt-5">
                            <button class="btn btn-danger btn-block" :disabled="invalid">送出訂單</button>
                        </div>
                    </form>
                </validation-observer>
            </div>
        </div>
    </div>
</template>

<script>
    import Cart from '@/components/cart';

    export default {
        name: "",
        data() {
            return {
                form: {
                    user: {
                        name: '',
                        email: '',
                        tel: '',
                        address: ''
                    },
                    message: ''
                },
                total: 0,
                finalTotal: 0,
                usingCode: '',
                couponCode: ''
            };
        },
        components: {
            Cart
        },
        created() {
            const vm = this;
            vm.getTotal();
        },
        methods: {
            createOrder() {
                const vm = this,
                    api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order`;
                const order = vm.form;

                this.$http.post(api, { data: order }).then((response) => {
                    if (response.data.success) {
                        vm.$router.push(`/order/pay/${response.data.orderId}`);
                    } else {
                        vm.$bus.$emit("message:push", response.data.message);
                    }
                });
            },
            getTotal() {
                const vm = this,
                    api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;

                this.$http.get(api).then((response) => {
                    vm.total = response.data.data.total;
                    vm.finalTotal = response.data.data.final_total;

                    if (vm.total != vm.finalTotal) {
                        vm.usingCode = response.data.data.carts[0].coupon.code;
                    }
                });
            },
            getCoupon() {
                const vm = this,
                    api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/coupon`;

                this.$http.post(api, { data: { code: vm.couponCode } }).then((response) => {
                    if (response.data.success) {
                        vm.finalTotal = response.data.data.final_total;
                        vm.usingCode = vm.couponCode;
                        vm.$refs.cart.updateCart();
                    }
                    vm.$bus.$emit("message:push", response.data.message);
                    vm.couponCode = '';
                });
            },
            delCoupon() {
                const vm = this,
                    api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/coupon`;

                this.$http.post(api, { data: { code: 'init' } }).then((response) => {
                    if (response.data.success) {
                        vm.finalTotal = response.data.data.final_total;
                        vm.usingCode = '';
                    }
                    vm.$bus.$emit("message:push", '已移除優惠券');
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