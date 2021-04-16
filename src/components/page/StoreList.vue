<template>
    <div>
        <div class="right-page">
            <!-- Start of toolbar -->
            <div class="toolbar">
                <button class="item-toolbar item-toolbar-add" @click="showListDetail">
                    <div class="img img-add"></div>
                    <span>Thêm mới</span>
                </button>

                <button class="item-toolbar item-toolbar-replication">
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
                            <td>
                                <input type="checkbox" @change="getChecked(store.StoreId, $event)"/>
                            </td>
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
            <Popup @statusPopup="statusPopup" @isDeleted="isDeleted" :listIds="listIds" />
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
            listIds: [],
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
            //Nếu xóa thành công -> set list rỗng
            if (params) {
                this.listIds = [];
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
            if (this.listIds.length !== 0) {
                this.statusShowPopup = true;
            } else {
                alert('Bạn chưa chọn bản ghi nào để xóa!');
            }
        },
        //Bắt sự kiện checkbox clicked
        getChecked(id, e) {
            if (e.target.checked) {
                this.listIds.push(id);
            } else {
                let position = this.listIds.indexOf(id);
                if (position !== -1) {
                    this.listIds.splice(position, 1);
                }
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
}
</script>