<template>
    <div>
        <div class="block">
            <Cart></Cart>
            <hr class="my-5">
            <form @submit.prevent="createOrder()">
                <div class="form-group">
                    <label for="useremail">Email</label>
                    <input type="email" class="form-control" name="email" id="useremail"
                        v-model="form.user.email" placeholder="請輸入 Email" required>
                    <span class="text-danger"></span>
                </div>
                <div class="form-group">
                    <label for="username">收件人姓名</label>
                    <input type="text" class="form-control" name="name" id="username"
                        v-model="form.user.name" placeholder="輸入姓名">
                    <span class="text-danger"></span>
                </div>
                <div class="form-group">
                    <label for="usertel">收件人電話</label>
                    <input type="tel" class="form-control" id="usertel" v-model="form.user.tel" placeholder="請輸入電話">
                </div>
                <div class="form-group">
                    <label for="useraddress">收件人地址</label>
                    <input type="text" class="form-control" name="address" id="useraddress" v-model="form.user.address"
                        placeholder="請輸入地址">
                    <span class="text-danger">地址欄位不得留空</span>
                </div>
                <div class="form-group">
                    <label for="comment">留言</label>
                    <textarea name="" id="comment" class="form-control" cols="30" rows="10" v-model="form.message"></textarea>
                </div>
                <div class="text-right">
                    <button class="btn btn-danger">送出訂單</button>
                </div>
            </form>
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
                }
            };
        },
        components: {
            Cart
        },
        created() {
            
        },
        methods: {
            createOrder() {
                const vm = this,
                    api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order`;
                const order = vm.form;

                this.$http.post(api, { data: order }).then((response) => {
                    console.log(response);
                    // if (response.data.success) {
                    //     vm.$bus.$emit("message:push", response.data.message);
                    // }
                });
            }
        }
    };
</script>

<style scoped>
.block {
    max-width: 700px;
    margin: auto;
}
</style>