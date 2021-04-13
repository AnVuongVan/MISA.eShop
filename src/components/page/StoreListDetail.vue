<template>
    <div>
        <div class="m-dialog">
            <div class="m-modal"></div>
            <form>
                <div class="m-content">
                    <div class="dialog-header">
                        <div class="title">Them moi cửa hàng</div>
                        <div class="icon-times" @click="hideListDetail"></div>
                    </div>
            
                    <div class="dialog-content">
                        <div class="children-input">
                            <label for="">Mã cửa hàng <span style="color: red;">*</span></label>
                            <input type="text" v-model.trim="formData.StoreCode" ref="StoreCode"
                            :class="{'is-invalid': (validateStatus($v.formData.StoreCode) || errors.StoreCode.length)}">        
                        </div>
            
                        <div class="children-input">
                            <label>Tên cửa hàng <span style="color: red;">*</span></label>
                            <input type="text" v-model.trim="formData.StoreName"
                            :class="{'is-invalid': validateStatus($v.formData.StoreName) }">
                        </div>
            
                        <div class="children-input">
                            <label for="">Địa chỉ <span style="color: red;">*</span></label>                     
                            <textarea cols="70" rows="5" v-model.trim="formData.Address"
                            :class="{'is-invalid': validateStatus($v.formData.Address)}">
                            </textarea>
                        </div>
            
                        <div class="children-input">
                            <div class="half-children-input">
                                <label>So dien thoai</label>
                                <input type="text" v-model.trim="formData.PhoneNumber">
                            </div>
                            <div class="half-children-input">
                                <label>Mã số thuế</label>
                                <input type="text" v-model.trim="formData.StoreTaxCode">
                            </div>
                        </div>
            
                        <div class="children-input">
                            <div class="half-children-input">
                                <label>Quoc gia</label>
                                <select v-model.trim="formData.CountryId" @change="onChangeCountry($event)">
                                    <option value="">Viet Nam</option>
                                    <option v-for="country in allCountries" :key="country.CountryId" 
                                    :value="country.CountryId">{{ country.CountryName }}</option>
                                </select>
                                <!-- <label>Quoc gia</label>
                                <div class="select-content">
                                    <input type="text" v-model.trim="formData.CountryId">
                                    <ul class="select-options">
                                        <li v-for="country in allCountries" :key="country.CountryId" 
                                            :value="country.CountryId">{{ country.CountryName }}</li>                                       
                                    </ul>
                                </div>
                                <span class="icon-arrow"></span>-->                        
                            </div>
                        </div>
            
                        <div class="children-input">
                            <div class="half-children-input">
                                <label>Tinh/Thanh pho</label>                            
                                <select v-model.trim="formData.ProvinceId" @change="onChangeProvince($event)">
                                    <option value="">Tinh thanh</option>
                                    <option v-for="province in allProvinces" :key="province.ProvinceId" 
                                    :value="province.ProvinceId">{{ province.ProvinceName }}</option>
                                </select>
                            </div>
                            <div class="half-children-input">
                                <label>Quan/Huyen</label>                             
                                <select v-model.trim="formData.DistrictId" @change="onChangeDistrict($event)">
                                    <option value="">Quan/Huyen</option>
                                    <option v-for="district in allDistricts" :key="district.DistrictId" 
                                    :value="district.DistrictId">{{ district.DistrictName }}</option>
                                </select>
                            </div>
                        </div>
            
                        <div class="children-input">
                            <div class="half-children-input">
                                <label>Phuong/Xa</label>                             
                                <select v-model.trim="formData.WardId">
                                    <option value="">Phuong/Xa</option>
                                    <option v-for="ward in allWards" :key="ward.WardId" 
                                    :value="ward.WardId">{{ ward.WardName }}</option>
                                </select>
                            </div>
                            <!-- <div class="half-children-input">
                                <label for="">Phuong xa</label>
                                <div class="select-content">
                                    <input type="text" id="custom-select">
                                    <ul class="select-options">                                     
                                    </ul>
                                </div>
                                <span class="icon-arrow"></span>
                            </div> -->
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
                            <button class="single-save" @click="saveData('SAVE', $event)">
                                <div class="icon-save"></div>
                                <span>Luu</span>
                            </button>

                            <button class="multiple-save-add" @click="saveData('SAVECONTINUE', $event)">
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
    </div>
</template>

<script>
import MISACode from '../../store/constant/code'
import PropertyName from '../../store/constant/property'
import { mapGetters, mapActions } from 'vuex';
import { required } from 'vuelidate/lib/validators'
import axios from 'axios'

export default{
    name: 'StoreListDetail',
    props: ['store'],
    data() {
        return {
            formData: {
                StoreCode: '',
                StoreName: '',
                Address: '',
                PhoneNumber: '',
                StoreTaxCode: '',    
                CountryId: '',
                ProvinceId: '',
                DistrictId: '',
                WardId: '',
                Street: '',
            },
            errors: {
                StoreCode: [],
                StoreName: [],
                Address: []
            },
            // isTooltip: {
            //     CustomerCode: false,
            //     PhoneNumber: false,
            // },
            allProvinces: [],
            allDistricts: [],
            allWards: []
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
        ...mapActions(['fetchCountries', 'dispatchStore']),
        validateStatus: function(validation) {
            return typeof validation != 'undefined'? validation.$error : false;
        },
        //form submit to create or update
        saveData: function(action, e) {
            e.preventDefault();

            this.$v.formData.$touch();
            if (this.$v.formData.$pending || this.$v.formData.$error) return;

            this.errors = {
                StoreCode: [],               
            };

            this.dispatchStore(this.formData)
                .then(res => {
                    switch (res.MISACode) {
                        case MISACode.NOTVALID:
                            res.Data.forEach(err => {
                                if (err.includes(PropertyName.STORE_CODE)) {
                                    this.errors.StoreCode.push(err);
                                } 
                            });                              
                            break;
                        case MISACode.ISVALID:
                        case MISACode.SUCCESS:  
                            if (action === MISACode.SAVECONTINUE) {
                                this.formData = {
                                    StoreCode: '',
                                    StoreName: '',
                                    Address: '',
                                    PhoneNumber: '',
                                    StoreTaxCode: '',    
                                    CountryId: '',
                                    ProvinceId: '',
                                    DistrictId: '',
                                    WardId: '',
                                    Street: '',
                                }
                            } else {
                                this.$emit("statusModal", false);
                            }                                                     
                            break;
                        default:
                            break;
                    }
                });
        },
        hideListDetail() {
            //pass value to parent components (CustomerList)
            this.errors = {};
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

        onChangeCountry(e) {
            let countryId = e.target.value;
            const params = {
                countryId: countryId, 
            };
            axios.get('http://localhost:62509/api/v1/provinces/country', { params })
                .then(response => {
                    this.allProvinces = response.data;
                })
                .catch(err => {
                    this.allProvinces = [];
                    this.allDistricts = [];
                    this.allWards = [];
                    console.log(err);
                });
        },
        onChangeProvince(e) {
            let provinceId = e.target.value;
            const params = {
                provinceId: provinceId, 
            };
            axios.get('http://localhost:62509/api/v1/districts/province', { params })
                .then(response => {
                    console.log(response.data);
                    this.allDistricts = response.data;
                })
                .catch(err => {
                    this.allDistricts = [];
                    this.allWards = [];
                    console.log(err);
                });
        },
        onChangeDistrict(e) {
            let districtId = e.target.value;
            const params = {
                districtId: districtId, 
            };
            axios.get('http://localhost:62509/api/v1/wards/district', { params })
                .then(response => {
                    console.log(response.data);
                    this.allWards = response.data;
                })
                .catch(err => {
                    this.allWards = [];
                    console.log(err);
                });
        },
    },
    computed: {
        ...mapGetters(['allCountries']),
    },
    created() {
        //set value for form data when update
        this.formData = Object.assign({}, this.store);
    },
    mounted() {
        this.fetchCountries();

        //auto focus customer code input
        this.$refs.StoreCode.focus();
    }
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