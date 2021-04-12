<template>
    <div class="dialog-remove">
        <div class="my-dialog"></div>
        <div class="remove-content">
            <div class="remove-header">
                <div class="title">Xoa du lieu</div>
                <div class="icon-times"></div>
            </div>
            <div class="remove-body">
                <div class="icon-question"></div>
                <div class="text-content">Ban co chac chan muon xoa cua hang <b style="color: #df4646;">Vuong Van An&nbsp;-&nbsp;(KH050699)</b> khong?</div>
            </div>
            <div class="remove-footer">
                <button class="single-trash">
                    <div class="icon-trash"></div>
                    <span>Xoa</span>
                </button>
                <button class="single-cancel">
                    <div class="icon-cancel"></div>
                    <span>Hủy bỏ</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default ({
    name: 'Popup',
    props: ['listIds'],
    methods: {
        ...mapActions(['deleteCustomer']),
        //fuction to remove customer
        removeCustomer() {     
            this.listIds.forEach(id => this.deleteCustomer(id));
            this.$emit('isDeleted', true);  
            this.$emit("statusPopup", false); 
        },
        hidePopup() {
            //pass value to parent components (CustomerList)
            this.$emit("statusPopup", false);
        }
    }
})
</script>
