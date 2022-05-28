<template>
    <div>
        <div class="block">
            <div class="pic">
                <img :src="product.imageUrl" alt="">
            </div>
            <div class="content">
                <div class="title">{{ product.title }}</div>
                <div class="description">{{ product.description }}</div>
                <div class="content">{{ product.content }}</div>
                <div class="origin_price">{{ product.origin_price }}</div>
                <div class="price">{{ product.price }}</div>
                <select class="form-control" v-model="product.num">
                    <option :value="item" v-for="item in 10" :key="item">
                        {{ item }}{{ product.unit }}
                    </option>
                </select>
                <button type="button" class="btn btn-outline-danger btn-sm ml-auto" @click="addToCart(product.id, product.num)">
                    <i class="fas fa-spinner fa-spin" v-if="isLoading"></i>
                    加到購物車
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "",
        data() {
            return {
                product: {},
                isLoading: false
            };
        },
        created() {
            const vm = this;
            vm.getProduct(vm.$route.params.id);
        },
        methods: {
            getProduct(id) {
                const vm = this,
                    api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${id}`;
                this.$http.get(api).then((response) => {
                    console.log(response.data);
                    vm.product = response.data.product;
                });
            },
            addToCart(id, qty = 1) {
                const vm = this,
                    api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
                const cart = {
                    product_id: id,
                    qty
                }

                vm.isLoading = true;
                this.$http.post(api, { data: cart }).then((response) => {
                    // console.log(response);
                    if (response.data.success) {
                        vm.$bus.$emit("message:push", response.data.message);
                    }
                    vm.isLoading = false;
                });
            }
        }
    };
</script>

<style scoped>
.block {
    display: flex;
    flex-wrap: wrap;
}
</style>