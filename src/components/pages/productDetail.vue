<template>
    <div>
        <div class="block">
            <div class="pic">
                <img :src="product.imageUrl" alt="">
            </div>
            <div class="content mt-5">
                <div class="title">{{ product.title }}</div>
                <div class="description my-2">{{ product.description }}</div>
                <div class="content">{{ product.content }}</div>
                <div class="d-flex justify-content-between align-items-baseline my-4">
                    <del>原價 {{ product.origin_price | currency }} 元</del>
                    <div class="price">現在只要 {{ product.price | currency }} 元</div>
                </div>
                <select class="form-control" v-model="product.num">
                    <option :value="item" v-for="item in 10" :key="item">
                        {{ item }}{{ product.unit }}
                    </option>
                </select>
                <div class="text-right mt-4">
                    <button type="button" class="btn btn-outline-danger btn-sm ml-auto" @click="addToCart(product.id, product.num)">
                        <i class="fas fa-spinner fa-spin" v-if="isLoading"></i>
                        加到購物車
                    </button>
                </div>
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
                    // console.log(response.data);
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
    max-width: 600px;
    margin: auto;
}
.pic img {
    width: 100%;
}
.title {
    font-size: 2rem;
    font-weight: bold;
}
.price {
    font-size: 1.5rem;
}
</style>