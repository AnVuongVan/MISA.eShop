<template>
    <div class="footer">
        <button class="item-footer page-first">
            <div class="img-footer img-page-first">
            </div>
        </button>
        <button class="item-footer page-prev">
            <div class="img-footer img-page-prev">
            </div>
        </button>
        <form action="">
            <label>Trang</label>
            <input type="number" value="1" />
            <label>trên 1</label>
        </form>
        <button class="item-footer page-next">
            <div class="img-footer img-page-next">
            </div>
        </button>
        <button class="item-footer page-last">
            <div class="img-footer img-page-last">
            </div>
        </button>
        <button class="item-footer page-load" @click="refreshData">
            <div class="img-footer img-page-load">
            </div>
        </button>
        <select>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
        </select>
        <div class="show-result">
            <span>Hiển thị 1 - 9 trên 9 kết quả</span>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: 'Paging',
    methods: {
        ...mapActions(['fetchStores']),
        refreshData() {
            this.fetchStores();
        }
    }
}
</script>

<style scoped>

</style>