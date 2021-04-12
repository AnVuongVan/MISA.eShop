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
                <button class="item-toolbar item-toolbar-modify">
                    <div class="img img-modify"></div>
                    <span>Sửa</span>
                </button>
                <button class="item-toolbar item-toolbar-delete">
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
                    <thead>
                        <tr>
                            <th class="checkBox">
                                <input type="checkbox">
                            </th>

                            <th class="code">
                                <span>Mã cửa hàng</span>
                                <div class="search-box">
                                    <select>
                                        <option value="approximate">*</option>
                                        <option value="exactly">=</option>
                                    </select>
                                    <input type="text">
                                </div>
                            </th>

                            <th class="name">
                                <span>Tên cửa hàng</span>
                                <div class="search-box">
                                    <select>
                                        <option value="approximate">*</option>
                                        <option value="exactly">=</option>
                                    </select>
                                    <input type="text">
                                </div>
                            </th>

                            <th class="address">
                                <span>Địa chỉ</span>
                                <div class="search-box">
                                    <select>
                                        <option value="approximate">*</option>
                                        <option value="exactly">=</option>
                                    </select>
                                    <input type="text">
                                </div>
                            </th>

                            <th class="phone">
                                <span>Số điện thoại</span>
                                <div class="search-box">
                                    <select>
                                        <option value="approximate">*</option>
                                        <option value="exactly">=</option>
                                    </select>
                                    <input type="text">
                                </div>
                            </th>
                            
                            <th class="status">
                                <span>Trạng thái</span>
                                <div class="search-box">
                                    <select id="status">
                                        <option selected value="true">Đang hoạt động</option>
                                        <option value="false">Ngừng hoạt động</option>
                                    </select>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <input type="checkbox"/>
                            </td>
                            <td>KH001</td>
                            <td>Sửa chữa Laptop 24/7</td>
                            <td>20 Lê Thanh Nghị, Hai Bà Trưng, Hà Nội</td>
                            <td>0976412509</td>
                            <td>Đang hoạt động</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <!-- End of table -->

            <!-- Start of footer -->
            <Paging />
            <!-- End of footer -->
        </div>

        <!-- <span v-if="statusListDetail">
            <StoreListDetail @statusModal="statusModal" @statusAlert="statusAlert" :customer="item" />
        </span> -->
        <span v-if="statusListDetail">
            <StoreListDetail @statusModal="statusModal" />
        </span>

        <!-- <span v-if="statusShowPopup">
            <Popup @statusPopup="statusPopup" @isDeleted="isDeleted" :listIds="listIds" />
        </span>

        <span v-if="statusAlertNotify">
            <AlertSuccess :statusAlertSuccess="statusAlertNotify" @isHide="statusAlert" />
        </span> -->
    </div>
</template>

<script>
// import { mapGetters, mapActions } from 'vuex';
import StoreListDetail from './StoreListDetail';
// import CustomerFilter from './CustomerFilter'

import Paging from '../base/Paging';
// import Popup from '../../../base/Popup';
// import AlertSuccess from '../../../base/AlertSuccess';

//import moment from 'moment'

export default{
    name: 'StoreList',
    components: {
        StoreListDetail,
        // CustomerFilter,
        Paging
        // Popup,
        // AlertSuccess,
    },
    data() {
        return {
            statusListDetail: false,
            // statusShowPopup: false,
            // statusAlertNotify: '',
            // item: {},
            // listIds: [],
            // error: false
        }
    },
    methods: {
        //...mapActions(['fetchCustomers']),
        //show when add new customer
        showListDetail() {
            this.item = {};
            this.statusListDetail = !this.statusListDetail;
        },
        //receive params status from child components
        statusModal(params) {
            this.statusListDetail = params;
        },
        // statusPopup(params) {
        //     this.statusShowPopup = params;
        // },
        // isDeleted(params) {
        //     //if customer removed -> set empty list
        //     if (params) {
        //         this.listIds = [];
        //         this.statusAlertNotify = 'DELETE';
        //     }
        // },
        // statusAlert(params) {
        //     this.statusAlertNotify = params;
        // },
        // //function to edit customer
        // onDoubleClick(customer) {
        //     this.item = Object.assign({}, customer);
        //     this.statusListDetail = !this.statusListDetail;
        // },
        // //function remove customer
        // removeCustomer() {
        //     if (this.listIds.length !== 0) {
        //         this.statusShowPopup = true;
        //     } else {
        //         alert('Ban chua chon ban ghi nao de xoa!');
        //     }
        // },
        // //catch event click every input checkbox
        // getChecked(id, e) {
        //     if (e.target.checked) {
        //         this.listIds.push(id);
        //     } else {
        //         let position = this.listIds.indexOf(id);
        //         if (position !== -1) {
        //             this.listIds.splice(position, 1);
        //         }
        //     }
        // },
        // //refresh list customers page
        // refreshListCustomers() {
        //     this.fetchCustomers();
        // },
        // //function format date to show
        // formatDate(dateTime) {
        //     if (dateTime) {
        //         return moment(String(dateTime)).format('DD-MM-YYYY');
        //     }
        // }
    },
    // computed: {
    //     ...mapGetters(['allCustomers']),
    // },
    // created() {
    //     this.fetchCustomers();
    // },
}
</script>