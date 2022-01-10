<template>
    <div>
        <nav aria-label="Page navigation example">
            <ul class="pagination">
                <li :class="['page-item', { disabled: !pagerData.has_pre }]">
                    <a class="page-link" href="#" aria-label="Previous" @click.prevent="changePage(pagerData.current_page-1)">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
                <li :class="['page-item', { active: pagerData.current_page === page }]" v-for="page in pagerData.total_pages" :key="page">
                    <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
                </li>
                <li :class="['page-item', { disabled: !pagerData.has_next }]">
                    <a class="page-link" href="#" aria-label="Next" @click.prevent="changePage(pagerData.current_page+1)">
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
    export default {
        props: ['pagerData'],
        methods: {
            changePage(page) {
                this.$emit('changePage', page);
            }
        }
    };
</script>

<style scoped>
</style>
