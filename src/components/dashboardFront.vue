<template>
    <div class="">
        <Header></Header>
        <Alert></Alert>
        <main class="wrap mt-4">
            <router-view></router-view>
        </main>
    </div>
</template>

<script>
    import Header from '@/components/headerFront';
    import Alert from '@/components/alertMessage';

    export default {
        name: "",
        data() {
            return {};
        },
        components: {
            Header,
            Alert
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrap {
    box-sizing: border-box;
    max-width: 1240px;
    margin: auto;
    padding: 20px;
}
</style>
