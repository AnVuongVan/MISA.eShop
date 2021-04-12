<template>
    <div>
        <div class="m-dialog">
            <div class="m-modal"></div>
            <form action="">
                <div class="m-content">
                    <div class="dialog-header">
                        <div class="title">Them moi cửa hàng</div>
                        <div class="icon-times" @click="hideListDetail"></div>
                    </div>
            
                    <div class="dialog-content">
                        <div class="children-input">
                            <label for="">Mã cửa hàng <span style="color: red;">*</span></label>
                            <input type="text" v-model.trim="formData.StoreCode"
                            :class="{'is-invalid': (validateStatus($v.formData.StoreCode) || errors.StoreCode.length)}">        
                        </div>
            
                        <div class="children-input">
                            <label>Tên cửa hàng <span style="color: red;">*</span></label>
                            <input type="text" v-model.trim="formData.StoreName"
                            :class="{'is-invalid': (validateStatus($v.formData.StoreName) || errors.StoreName.length)}">
                        </div>
            
                        <div class="children-input">
                            <label for="">Địa chỉ <span style="color: red;">*</span></label>                     
                            <textarea cols="70" rows="5" v-model.trim="formData.Address"
                            :class="{'is-invalid': (validateStatus($v.formData.Address) || errors.Address.length)}">
                            </textarea>
                        </div>
            
                        <div class="children-input">
                            <div class="half-children-input">
                                <label>So dien thoai</label>
                                <input type="text" v-model.trim="formData.PhoneNumber">
                            </div>
                            <div class="half-children-input">
                                <label>Mã số thuế</label>
                                <input type="text" v-model.trim="formData.TaxCode">
                            </div>
                        </div>
            
                        <div class="children-input">
                            <div class="half-children-input">
                                <label>Quoc gia</label>
                                <select v-model.trim="formData.Country">
                                    <option value="">Viet Nam</option>
                                </select>
                            </div>
                        </div>
            
                        <div class="children-input">
                            <div class="half-children-input">
                                <label>Tinh/Thanh pho</label>
                                <select v-model.trim="formData.Province">
                                    <option value="">Bac Ninh</option>
                                </select>
                            </div>
                            <div class="half-children-input">
                                <label>Quan/Huyen</label>
                                <select v-model.trim="formData.District">
                                    <option value="">Thuan Thanh</option>
                                </select>
                            </div>
                        </div>
            
                        <div class="children-input">
                            <div class="half-children-input">
                                <label>Phuong xa</label>
                                <select v-model.trim="formData.Ward">
                                    <option value="">Tram Lo</option>
                                </select>
                            </div>
                            <div class="half-children-input">
                                <label>Duong pho</label>
                                <input type="text" v-model.trim="formData.Street">
                            </div>
                        </div>
                    </div>
            
                    <div class="dialog-footer">
                        <button class="single-help">
                            <div class="icon-help"></div>
                            <span>Tro giúp</span>
                        </button>

                        <div class="dialog-footer-right">
                            <button class="single-save" @click="saveData">
                                <div class="icon-save"></div>
                                <span>Luu</span>
                            </button>

                            <button class="multiple-save-add">
                                <div class="icon-save-add"></div>
                                <span>Luu va them moi</span>
                            </button>

                            <button class="single-close" @click="hideListDetail">
                                <div class="icon-close"></div>
                                <span>Hủy bỏ</span>
                            </button>
                        </div> 
                    </div>
                </div>
            </form>
        </div>

        <Loading v-if="isLoading" />
    </div>
</template>

<script>
// import moment from 'moment'
// import MISACode from '../../../../store/constant/code'
// import PropertyName from '../../../../store/constant/property'
import Loading from '../base/Loading'
// import { mapGetters, mapActions } from 'vuex';
import { required } from 'vuelidate/lib/validators'

export default{
    name: 'StoreListDetail',
    //props: ['customer'],
    components: {
        Loading
    },
    data() {
        return {
            formData: {
                StoreCode: '',
                StoreName: '',
                Address: '',
                PhoneNumber: '',
                TaxCode: '',    
                Country: '',
                Province: '',
                District: '',
                Ward: '',
                Street: '',
            },
            errors: {
                StoreCode: [],
                StoreName: [],
                Address: []
            },
            isLoading: false,
            // isTooltip: {
            //     CustomerCode: false,
            //     PhoneNumber: false,
            // },
        }
    },
    validations: {
        formData: {
            StoreCode: { required },
            StoreName: { required },
            Address: { required },
        }
    },
    methods: {
        // ...mapActions(['fetchCustomerGroups', 'dispatchCustomer']),
        validateStatus: function(validation) {
            return typeof validation != 'undefined'? validation.$error : false;
        },
        //form submit to create or update
        onSubmit(e) {
            e.preventDefault();

            this.$v.formData.$touch();
            if (this.$v.formData.$pending || this.$v.formData.$error) return;

            this.isLoading = true;
            setTimeout(() => {
                this.isLoading = false;
            }, 2000);

            this.errors = {
                CustomerCode: [],
                PhoneNumber: []
            };

        //     var customerId = this.formData.CustomerId;

        //     this.dispatchCustomer(this.formData)
        //         .then(res => {
        //             switch (res.MISACode) {
        //                 case MISACode.NOTVALID:
        //                     res.Data.forEach(err => {
        //                         if (err.includes(PropertyName.CUSTOMER_CODE)) {
        //                             this.errors.CustomerCode.push(err);
        //                         } else if (err.includes(PropertyName.PHONE_NUMBER)) {
        //                             this.errors.PhoneNumber.push(err);
        //                         }
        //                     });                              
        //                     break;
        //                 case MISACode.ISVALID:
        //                 case MISACode.SUCCESS:                                
        //                     this.$emit("statusModal", false);
        //                     if (customerId) {
        //                         this.$emit("statusAlert", "UPDATE");
        //                     } else {
        //                         this.$emit("statusAlert", "ADD");
        //                     }
        //                     break;
        //                 default:
        //                     break;
        //             }
        //         });
        },
        saveData: function(e) {
            e.preventDefault();
            alert('Hello');
        },
        hideListDetail() {
            //pass value to parent components (CustomerList)
            //this.errors = {};
            this.$emit("statusModal", false);
        },
        //show tooltip error
        // overCustomerCode() {
        //     this.isTooltip.CustomerCode = !this.isTooltip.CustomerCode;
        // },
        // overPhoneNumber() {
        //     this.isTooltip.PhoneNumber = !this.isTooltip.PhoneNumber;
        // },
        // //hide tooltip error
        // leaveCustomerCode() {
        //     this.isTooltip.CustomerCode = !this.isTooltip.CustomerCode;          
        // },
        // leavePhoneNumber() {
        //     this.isTooltip.PhoneNumber = !this.isTooltip.PhoneNumber;         
        // }
    },
    // computed: {
    //     ...mapGetters(['allGroups']),
    // },
    // created() {
    //     //set value for form data when update
    //     this.formData = Object.assign({}, this.customer);
        
    //     //format date from database to show
    //     if (this.formData.DateOfBirth) {
    //         this.formData.DateOfBirth = moment(String(this.formData.DateOfBirth)).format('YYYY-MM-DD');
    //     }
    // },
    // mounted() {
    //     this.fetchCustomerGroups();

    //     //auto focus customer code input
    //     this.$refs.CustomerCode.focus();
    // }
}
</script>

<style scoped>
.is-invalid {
    border: 1px solid #FF4747;
}

.input-required {
    position: relative;
}

.tooltip-error {
    position: absolute;
    left: 15%;
    top: -112%;
    right: 15%;
    background-color: #FF4747;
    color: #fff;
    text-align: center;
    border-radius: 4px;
    padding: 5px;
    font-size: 13px;
}

.tooltip-error::after {
    content: '';
    position: absolute;
    left: 50%;
    top: 100%;
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 6px solid #FF4747;
    z-index: 5;
    clear: both;
}
</style>