<template>
    <div>
        <div class="right-page">
            <!-- Start of toolbar -->
            <div class="toolbar">
                <button class="item-toolbar item-toolbar-add" @click="showListDetail">
                    <div class="img img-add"></div>
                    <span>Thêm mới</span>
                </button>

                <button class="item-toolbar item-toolbar-replication" @click="replicateStore">
                    <div class="img img-replication"></div>
                    <span>Nhân bản</span>
                </button>

                <button class="item-toolbar item-toolbar-modify" @click="editStore">
                    <div class="img img-modify"></div>
                    <span>Sửa</span>
                </button>

                <button class="item-toolbar item-toolbar-delete" @click="removeStore">
                    <div class="img img-delete"></div>
                    <span>Xóa</span>
                </button>

                <button class="item-toolbar item-toolbar-load">
                    <div class="img img-load"></div>
                    <span>Nạp</span>
                </button>

                <button class="item-toolbar item-toolbar-import">
                    <div class="img img-import"></div>
                    <span>Nhập khẩu</span>
                </button>
                
                <button class="item-toolbar item-toolbar-export">
                    <div class="img img-export"></div>
                    <span>Xuất khẩu</span>
                </button>
            </div>
            <!-- End of toolbar -->

            <!-- Start of table -->
            <div class="table-content">
                <table class="main-table">
                    <StoreFilter />
                    <tbody>
                        <tr v-for="store in allStores" :key="store.StoreId" @click="selectedRow(store)"
                        @dblclick="onDoubleClick(store)" :class="{'row-selected': store.StoreId === storeId }">                          
                            <td v-text="store.StoreCode"></td>
                            <td v-text="store.StoreName"></td>
                            <td v-text="store.Address"></td>
                            <td v-text="store.PhoneNumber"></td>
                            <td>
                                <span v-if="store.Status == 1">Đang hoạt động</span>
                                <span v-else>Ngừng hoạt động</span>
                            </td>                           
                        </tr>
                    </tbody>
                </table>
            </div>
            <!-- End of table -->

            <!-- Start of footer -->
            <Paging />
            <!-- End of footer -->
        </div>

        <span v-if="statusListDetail">
            <StoreListDetail @statusModal="statusModal" :store="item" />
        </span>

        <span v-if="statusShowPopup">
            <Popup @statusPopup="statusPopup" @isDeleted="isDeleted" :storeId="storeId" />
        </span>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import StoreListDetail from './StoreListDetail';
import StoreFilter from './StoreFilter';

import Paging from '../base/Paging';
import Popup from '../base/Popup';

export default{
    name: 'StoreList',
    components: {
        StoreListDetail,
        StoreFilter,
        Paging,
        Popup,
    },
    data() {
        return {
            statusListDetail: false,
            statusShowPopup: false,
            item: {},
            storeId: ''
        }
    },
    methods: {
        ...mapActions(['fetchStores']),
        //Hiển thị khi thêm mới cửa hàng
        showListDetail() {
            this.item = {};
            this.statusListDetail = !this.statusListDetail;
        },
        //Nhận status params từ component child
        statusModal(params) {
            this.statusListDetail = params;
        },
        statusPopup(params) {
            this.statusShowPopup = params;
        },
        isDeleted(params) {
            //Nếu xóa thành công -> set storeId
            if (params) {
                this.storeId = this.$store.state.stores.stores[0].StoreId;
            }
        },
        //Hàm edit store
        onDoubleClick(store) {
            this.item = Object.assign({}, store);
            this.statusListDetail = !this.statusListDetail;
        },
        editStore() {
            if (this.storeId) {
                this.statusListDetail = !this.statusListDetail;
            }    
        },
        //Hàm thực hiện xóa store
        removeStore() {
            if (this.storeId) {
                this.statusShowPopup = true;
            } else {
                alert('Bạn chưa chọn bản ghi nào để xóa!');
            }
        },
        //Hàm thực hiện nhân bản store
        replicateStore() {
            if (this.storeId) {
                delete this.item.StoreId;
                this.statusListDetail = !this.statusListDetail;
            } 
        },
        //Highlight hàng được chọn
        selectedRow(store) {
            this.storeId = store.StoreId;
            this.item = Object.assign({}, store);
        }
    },
    computed: {
        ...mapGetters(['allStores']),
    },
    created() {    
        this.fetchStores();
    },
    updated() {
        this.storeId = this.$store.state.stores.stores[0].StoreId;
        this.$store.dispatch('fetchOneStore', this.storeId)
            .then(res => {
                this.item = Object.assign({}, res);
            })
            .catch(err => {
                console.log(err);
            });
    }
}
</script>