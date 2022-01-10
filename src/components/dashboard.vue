<template>
    <div class="">
        <Header></Header>
        <SideBar></SideBar>
        <Alert></Alert>
        <main class="col-md-9 ml-sm-auto col-lg-10 px-md-4">
            <router-view></router-view>
        </main>
    </div>
</template>

<script>
    import Header from '@/components/header';
    import SideBar from '@/components/sideBar';
    import Alert from '@/components/alertMessage';

    export default {
        name: "",
        data() {
            return {};
        },
        components: {
            Header,
            SideBar,
            Alert
        },
        created() {
            const myCookie = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, "$1");
            this.$http.defaults.headers.common.Authorization = myCookie;
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
    font-weight: normal;
}
ul {
    list-style-type: none;
    padding: 0;
}
li {
    display: inline-block;
    margin: 0 10px;
}
a {
    color: #42b983;
}
</style>
