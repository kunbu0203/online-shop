<template>
    <div>
        <div class="block">
            <div class="col-md-4 mb-4" v-for="item in enabledProducts" :key="item.id">
                <div class="card border-0 shadow-sm">
                    <div :style="`height: 150px; background-size: cover; background-position: center; background-image: url(${item.imageUrl});`">
                    </div>
                    <div class="card-body">
                        <span class="badge badge-secondary float-right ml-2">{{ item.category }}</span>
                        <h5 class="card-title">{{ item.title }}</h5>
                        <p class="card-text">{{ item.content }}</p>
                        <div class="d-flex justify-content-between align-items-baseline">
                            <!-- <div class="h5">2,800 元</div> -->
                            <del class="h6">原價 {{ item.origin_price | currency }} 元</del>
                            <div class="h5">現在只要 {{ item.price | currency }} 元</div>
                        </div>
                    </div>
                    <div class="card-footer d-flex">
                        <router-link class="btn btn-outline-secondary btn-sm" :to="`/list/detail/${item.id}`">
                            <!-- <i class="fas fa-spinner fa-spin"></i> -->
                            查看更多
                        </router-link>
                        <!-- <button type="button" class="btn btn-outline-secondary btn-sm">
                            <i class="fas fa-spinner fa-spin"></i>
                            查看更多
                        </button> -->
                        <button type="button" class="btn btn-outline-danger btn-sm ml-auto" @click="addToCart(item.id)">
                            <i class="fas fa-spinner fa-spin" v-if="loadingItem === item.id"></i>
                            加到購物車
                        </button>
                    </div>
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
                products: [],
                loadingItem: ''
            };
        },
        created() {
            const vm = this;
            vm.getProducts();
        },
        computed: {
            enabledProducts() {
                return this.products.filter(item => item.is_enabled);
            }
        },
        methods: {
            getProducts(page = 1) {
                const vm = this,
                    api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products?page=${page}`;
                // vm.isLoading = true;
                this.$http.get(api).then((response) => {
                    // console.log(response.data);
                    vm.products = response.data.products;
                    // vm.pagination = response.data.pagination;
                    vm.isLoading = false;
                });
            },
            addToCart(id) {
                const vm = this,
                    api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
                const cart = {
                    product_id: id,
                    qty: 1
                }

                vm.loadingItem = id;
                this.$http.post(api, { data: cart }).then((response) => {
                    // console.log(response);
                    if (response.data.success) {
                        vm.$bus.$emit("message:push", response.data.message);
                    }
                    vm.loadingItem = '';
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

.card {
    overflow: hidden;
}
</style>