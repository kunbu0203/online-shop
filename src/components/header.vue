<template>
    <div class="">
        <header class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
            <a class="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">後台</a>
            <button class="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="navbar-nav">
                <div class="nav-item text-nowrap">
                    <a class="nav-link px-3" href="#" @click.prevent="signOut()">登出</a>
                </div>
            </div>
        </header>
    </div>
</template>

<script>
    export default {
        name: "",
        data() {
            return {};
        },
        methods: {
            signOut() {
                const vm = this,
                    api = `${process.env.APIPATH}/logout`;
                this.$http.post(api).then((response) => {
                    if (response.data.success) {
                        vm.$router.push('/login');
                    }
                })
            }
        }
    };
</script>

<style scoped>
</style>
