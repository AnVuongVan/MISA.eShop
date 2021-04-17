<template>
    <div class="dialog-remove">
        <div class="my-dialog"></div>
        <div class="remove-content">
            <div class="remove-header">
                <div class="title">Xóa dữ liệu</div>
                <div class="icon-times" @click="hidePopup"></div>
            </div>

            <div class="remove-body">
                <div class="icon-question"></div>
                <div class="text-content">Bạn có chắc chắn muốn xóa cửa hàng <b>{{ storeName }}&nbsp;-&nbsp;({{ storeCode }})</b> không?</div> <!-- style="color: #df4646;" -->
            </div>

            <div class="remove-footer">
                <button class="single-trash" @click="removeStore">
                    <div class="icon-trash"></div>
                    <span>Xóa</span>
                </button>
                <button class="single-cancel" @click="hidePopup">
                    <div class="icon-cancel"></div>
                    <span>Hủy bỏ</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import axios from 'axios'

export default ({
    name: 'Popup',
    props: ['listIds'],
    data() {
        return {
            storeName: 'với nhiều bản ghi',
            storeCode: 'đã chọn'
        }
    },
    methods: {
        ...mapActions(['deleteStore']),
        //Hàm xóa cửa hàng
        removeStore() { 
            this.listIds.forEach(id => this.deleteStore(id));
            this.$emit('isDeleted', true);  
            this.$emit("statusPopup", false); 
        },
        hidePopup() {
            this.$emit("statusPopup", false);
        }
    },
    created() {
        //Lấy thông tin chi tiết của cửa hàng cần xóa
        if (this.listIds.length == 1) {
            axios.get('http://localhost:62509/api/v1/stores/' + this.listIds[0])
            .then(response => {
                this.storeName = response.data.StoreName;
                this.storeCode = response.data.StoreCode;
            })
            .catch(err => {
                console.log(err);
            })
        }
    }
})
</script>
