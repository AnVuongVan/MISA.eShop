<template>
    <div class="dialog-remove">
        <div class="my-dialog"></div>
        <div class="remove-content">
            <div class="remove-header">
                <div class="title">Xoa du lieu</div>
                <div class="icon-times" @click="hidePopup"></div>
            </div>
            <div class="remove-body">
                <div class="icon-question"></div>
                <div class="text-content">Ban co chac chan muon xoa cua hang <b style="color: #df4646;">{{ storeName }}&nbsp;-&nbsp;({{ storeCode }})</b> khong?</div>
            </div>
            <div class="remove-footer">
                <button class="single-trash" @click="removeStore">
                    <div class="icon-trash"></div>
                    <span>Xoa</span>
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
            storeName: 'voi nhieu ban ghi',
            storeCode: 'da chon'
        }
    },
    methods: {
        ...mapActions(['deleteStore']),
        //fuction to remove customer
        removeStore() { 
            this.listIds.forEach(id => this.deleteStore(id));
            this.$emit('isDeleted', true);  
            this.$emit("statusPopup", false); 
        },
        hidePopup() {
            //pass value to parent components (CustomerList)
            this.$emit("statusPopup", false);
        }
    },
    created() {
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
