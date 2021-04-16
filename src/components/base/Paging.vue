<template>
    <div class="footer">
        <button class="item-footer page-first" @click="firstPage">
            <div class="img-footer img-page-first">
            </div>
        </button>

        <button class="item-footer page-prev" @click="prevPage">
            <div class="img-footer img-page-prev">
            </div>
        </button>

        <form @submit="getNumberOfPage">
            <label>Trang</label>
            <input type="number" v-model="paging.currentPage" />
            <span>trên {{ paging.totalPage }}</span>
        </form>

        <button class="item-footer page-next" @click="nextPage">
            <div class="img-footer img-page-next">
            </div>
        </button>

        <button class="item-footer page-last" @click="lastPage">
            <div class="img-footer img-page-last">
            </div>
        </button>

        <button class="item-footer page-load" @click="refreshData">
            <div class="img-footer img-page-load">
            </div>
        </button>

        <select v-model="paging.limit" @change="getQuery">
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
        </select>

        <div class="show-result">
            <span>Hiển thị {{ this.paging.limit * this.paging.offset + 1 }} <b>-</b> 
                {{ numberOfDestinationPage() }} trên 
                {{ this.$store.state.stores.totalItems }} kết quả
            </span>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import debounce from 'debounce';

export default {
    name: 'Paging',
    data() {
        return {
            paging: {
                limit: 50,
                offset: 0,
                totalPage: 0,
                currentPage: 1
            }
        }
    },
    methods: {
        ...mapActions(['fetchStores', 'pagingStores']),
        refreshData() {
            this.fetchStores();
        },
        //Hàm thực hiện mỗi khi select dữ liệu thay đổi
        getQuery: debounce(function () {
            this.paging.currentPage = 1;
            this.paging.offset = 0;

            this.setParamsToPaging();  
            this.paging.totalPage = Math.ceil(this.$store.state.stores.totalItems / this.paging.limit);
        }, 100),
        //Hàm thực hiện khi nhập số trang vào input
        getNumberOfPage: function(e) {
            e.preventDefault();
            if (this.paging.currentPage > this.paging.totalPage || this.paging.currentPage < 1) return;
            this.paging.offset = this.paging.currentPage - 1;
            this.setParamsToPaging();  
        },
        //Nhấn vào nút quay đầu trang
        firstPage: debounce(function () {
            if (this.paging.currentPage !== 1) {
                this.paging.currentPage = 1;
                this.paging.offset = 0;

                this.setParamsToPaging(); 
            }          
        }, 100),
        //Nhấn vào nút quay trang trước
        prevPage: debounce(function () {
            if (this.paging.currentPage > 1) {
                this.paging.currentPage -= 1;
                this.paging.offset = this.paging.currentPage - 1;

                this.setParamsToPaging();
            }         
        }, 100),
        //Nhấn vào nút tới trang tiếp theo
        nextPage: debounce(function () {
            if (this.paging.currentPage !== this.paging.totalPage) {
                this.paging.currentPage += 1;
                this.paging.offset = this.paging.currentPage - 1;

                this.setParamsToPaging(); 
            }          
        }, 100),
        //Nhấn vào nút tới trang cuối
        lastPage: debounce(function () {
            if (this.paging.currentPage < this.paging.totalPage) {
                this.paging.currentPage = this.paging.totalPage;
                this.paging.offset = this.paging.currentPage - 1;
 
                this.setParamsToPaging();
            }         
        }, 100),
        //Set params với limit & offset 
        setParamsToPaging() {
            const data = {
                limit: this.paging.limit,
                offset: this.paging.offset,
            }                   
            this.$store.dispatch('pagingStores', data);
        },
        //Lấy kết quả cuối của trang
        numberOfDestinationPage: function () {
            let itemDest = this.paging.limit * (this.paging.offset + 1);
            return (itemDest < this.$store.state.stores.totalItems) ? itemDest : this.$store.state.stores.totalItems;
        }
    },
    mounted() { 
        this.numberOfDestinationPage();
    },
    created() {
        this.paging.currentPage = 1;
    },
    updated() {
        this.paging.totalPage = Math.ceil(this.$store.state.stores.totalItems / this.paging.limit);
    }
}
</script>

<style scoped>

</style>