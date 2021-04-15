<template>
    <div>
        <div class="m-dialog">
            <div class="m-modal"></div>
            <form>
                <div class="m-content">
                    <div class="dialog-header">
                        <div class="title" v-text="this.title"></div>
                        <div class="icon-times" @click="hideListDetail"></div>
                    </div>
            
                    <div class="dialog-content">
                        <div class="children-input">
                            <label for="">Mã cửa hàng <span style="color: red;">*</span></label>

                            <input type="text" v-model.trim="formData.StoreCode" ref="StoreCode"
                                @blur="storeCodeBlur" @input="getInputChange(1)"
                                :class="{'is-invalid': errors.StoreCode.length}">

                            <div class="msg-error" v-if="errors.StoreCode.length">
                                <span class="icon-error" @mouseover="overStoreCode" @mouseleave="leaveStoreCode"></span>
                                <span class="tooltip-error" v-if="isTooltip.StoreCode">{{ errors.StoreCode[0] }}</span>
                            </div>
                        </div>
            
                        <div class="children-input">
                            <label>Tên cửa hàng <span style="color: red;">*</span></label>

                            <input type="text" v-model.trim="formData.StoreName" 
                                @blur="storeNameBlur" @input="getInputChange(2)"
                                :class="{'is-invalid': errors.StoreName.length}">

                            <div class="msg-error" v-if="errors.StoreName.length">
                                <span class="icon-error" @mouseover="overStoreName" @mouseleave="leaveStoreName"></span>
                                <span class="tooltip-error" v-if="isTooltip.StoreName">{{ errors.StoreName[0] }}</span>
                            </div>
                        </div>
            
                        <div class="children-input">
                            <label for="">Địa chỉ <span style="color: red;">*</span></label>   

                            <input type="text" v-model.trim="formData.Address" 
                                @blur="addressBlur" @input="getInputChange(3)" style="height: 80px"
                                :class="{'is-invalid': errors.Address.length}">

                            <div class="msg-error" v-if="errors.Address.length">
                                <span class="icon-error" @mouseover="overAddress" @mouseleave="leaveAddress"></span>
                                <span class="tooltip-error" v-if="isTooltip.Address">{{ errors.Address[0] }}</span>
                            </div>
                        </div>
            
                        <div class="children-input">
                            <div class="half-children-input">
                                <label>Số điện thoại</label>
                                <input type="text" v-model.trim="formData.PhoneNumber">
                            </div>
                            <div class="half-children-input right-child">
                                <label>Mã số thuế</label>
                                <input type="text" v-model.trim="formData.StoreTaxCode">
                            </div>
                        </div>
            
                        <div class="children-input">
                            <div class="half-children-input">
                                <label>Quốc gia</label>
                                <select v-model.trim="formData.CountryId" @change="onChangeCountry($event)">
                                    <option v-for="country in allCountries" :key="country.CountryId" 
                                    :value="country.CountryId">{{ country.CountryName }}</option>
                                </select>
                                <!-- <label>Quoc gia</label>
                                <div class="select-content">
                                    <input type="text" v-bind:value="formData.CountryId">
                                    <ul class="select-options">
                                        <li v-for="country in allCountries" :key="country.CountryId" @click="selectCountry(country)"
                                            :value="country.CountryId">{{ country.CountryName }}
                                        </li>                                       
                                    </ul>
                                </div>
                                <span class="icon-arrow"></span> -->
                            </div>
                        </div>
            
                        <div class="children-input">
                            <div class="half-children-input">
                                <label>Tỉnh/Thành phố</label>                            
                                <select v-model.trim="formData.ProvinceId" @change="onChangeProvince($event)">                                   
                                    <option v-for="province in allProvinces" :key="province.ProvinceId" 
                                    :value="province.ProvinceId">{{ province.ProvinceName }}</option>
                                </select>
                            </div>
                            <div class="half-children-input right-child">
                                <label>Quận/Huyện</label>                             
                                <select v-model.trim="formData.DistrictId" @change="onChangeDistrict($event)">                                    
                                    <option v-for="district in allDistricts" :key="district.DistrictId" 
                                    :value="district.DistrictId">{{ district.DistrictName }}</option>
                                </select>
                            </div>
                        </div>
            
                        <div class="children-input">
                            <div class="half-children-input">
                                <label>Phường/Xã</label>                             
                                <select v-model.trim="formData.WardId">                                  
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
                            <div class="half-children-input right-child">
                                <label>Đường phố</label>
                                <input type="text" v-model.trim="formData.Street">
                            </div>
                        </div>

                        <div class="childern-input input-checkbox" v-if="this.status">
                            <label></label>
                            <div class="check-status">
                                <input type="checkbox" v-model="formData.Status" />
                                <span>Đang hoạt động</span>
                            </div>                        
                        </div>
                    </div>
            
                    <div class="dialog-footer">
                        <button class="single-help">
                            <div class="icon-help"></div>
                            <span>Trợ giúp</span>
                        </button>

                        <div class="dialog-footer-right">
                            <button class="single-save" @click="saveData('SAVE', $event)">
                                <div class="icon-save"></div>
                                <span>Lưu</span>
                            </button>

                            <button class="multiple-save-add" @click="saveData('SAVE_CONTINUE', $event)">
                                <div class="icon-save-add"></div>
                                <span>Lưu và thêm mới</span>
                            </button>

                            <button class="single-close" @keydown="onLastTab">
                                <div class="icon-close"></div>
                                <span @click="hideListDetail">Hủy bỏ</span>
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

export default{
    name: 'StoreListDetail',
    props: ['store'],
    data() {
        return {
            title: '',
            status: '',
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
                Status: ''
            },
            errors: {
                StoreCode: [],
                StoreName: [],
                Address: []
            },
            isTooltip: {
                StoreCode: PropertyName.UN_ACTIVE,
                StoreName: PropertyName.UN_ACTIVE,
                Address: PropertyName.UN_ACTIVE
            },
        }
    },
    methods: {
        ...mapActions(['fetchCountries', 'fetchProvinces', 'fetchDistricts', 'fetchWards', 
        'fetchProvincesWithCountry', 'fetchDistrictsWithProvince', 'fetchWardsWithDistrict', 'dispatchStore']),
        //form submit to create or update
        saveData: function(action, e) {
            e.preventDefault();

            this.errors = {
                StoreCode: [],
                StoreName: [],
                Address: []            
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
                            if (action === MISACode.SAVE_CONTINUE) {
                                this.formData = {};
                                this.title = PropertyName.CREATE_STORE;
                                this.status = PropertyName.UN_ACTIVE;
                                this.$refs.StoreCode.focus();
                            } else {
                                this.$emit("statusModal", PropertyName.UN_ACTIVE);
                            }                                                     
                            break;
                        default:
                            break;
                    }
                });
        },
        hideListDetail() {
            this.errors = {};
            this.$emit("statusModal", PropertyName.UN_ACTIVE);
        },
        //show tooltip error
        overStoreCode() {
            this.isTooltip.StoreCode = !this.isTooltip.StoreCode;
        },
        overStoreName() {
            this.isTooltip.StoreName = !this.isTooltip.StoreName;
        },
        overAddress() {
            this.isTooltip.Address = !this.isTooltip.Address;
        },
        //hide tooltip error
        leaveStoreCode() {
            this.isTooltip.StoreCode = !this.isTooltip.StoreCode;          
        },
        leaveStoreName() {
            this.isTooltip.StoreName = !this.isTooltip.StoreName;          
        },
        leaveAddress() {
            this.isTooltip.Address = !this.isTooltip.Address;          
        },
        //catch event select box change
        onChangeCountry(e) {
            let countryId = e.target.value;
            this.fetchProvincesWithCountry(countryId);
        },
        onChangeProvince(e) {
            let provinceId = e.target.value;
            this.fetchDistrictsWithProvince(provinceId);
        },
        onChangeDistrict(e) {
            let districtId = e.target.value;
            this.fetchWardsWithDistrict(districtId);
        },
        //catch event on input
        getInputChange(number) {
            switch (number) {
                case 1:
                    if (!this.formData.StoreCode) {
                        this.errors.StoreCode.push(PropertyName.INPUT_REQUIRED);
                    } else {
                        this.errors.StoreCode = [];
                    }
                    break;
                case 2:
                    if (!this.formData.StoreName) {
                        this.errors.StoreName.push(PropertyName.INPUT_REQUIRED);
                    } else {
                        this.errors.StoreName = [];
                    }
                    break;
                case 3:
                    if (!this.formData.Address) {
                        this.errors.Address.push(PropertyName.INPUT_REQUIRED);
                    } else {
                        this.errors.Address = [];
                    }
                    break;
                default:
                    break;
            }
        },
        //catch event blur input
        storeCodeBlur(e) {
            if (!e.target.value) {
                this.errors.StoreCode.push(PropertyName.INPUT_REQUIRED);
            } else {
                this.errors.StoreCode = [];
            }
        },
        storeNameBlur(e) {
            if (!e.target.value) {
                this.errors.StoreName.push(PropertyName.INPUT_REQUIRED);
            } else {
                this.errors.StoreName = [];
            }
        },
        addressBlur(e) {
            if (!e.target.value) {
                this.errors.Address.push(PropertyName.INPUT_REQUIRED);
            } else {
                this.errors.Address = [];
            }
        },
        onLastTab(e) {
            if (e.keyCode == 9) {
                e.preventDefault();
                this.$refs.StoreCode.focus();
            } else if(e.keyCode == 13) {
                this.hideListDetail();
            }
        },
    },
    computed: {
        ...mapGetters(['allCountries', 'allProvinces', 'allDistricts','allWards']),
    },
    created() {
        //set value for form data when update
        this.formData = Object.assign({}, this.store);

        if (this.formData.StoreCode) {
            this.title = PropertyName.UPDATE_STORE;
            this.status = PropertyName.ACTIVE;
        } else {
            this.title = PropertyName.CREATE_STORE;
            this.status = PropertyName.UN_ACTIVE;
        }
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

.msg-error {
    width: 26px;
    height: 34px;
    padding: 5px;
    display: flex;
    align-items: center;
    position: relative;
}

.msg-error span.icon-error {
    background: url('https://eshopvnappg2.misacdn.net/QLCH/resources/images/form/exclamation.png') no-repeat center center;
    background-size: contain;
    width: 16px;
    height: 16px;
    display: block;
}

.msg-error span.tooltip-error {
    position: absolute;
    left: 110%;
    top: 80%;
    right: -790%;
    background-color: #FF4747;
    color: #fff;
    text-align: center;
    border-radius: 2px;
    padding: 10px 6px;
    font-size: 13px;
    display: block;
    box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.2);
}
</style>