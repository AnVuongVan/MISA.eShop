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

                            <textarea v-model.trim="formData.Address" @blur="addressBlur" 
                                @input="getInputChange(3)" cols="75" rows="6" 
                                :class="{'is-invalid': errors.Address.length}"></textarea>

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
                                <div class="select-content">
                                    <input type="text" v-model='administrativeUnit.CountryName'
                                        @input="onChangeCountry" placeholder="Nhập để tìm kiếm">

                                    <ul class="select-options" v-if="administrativeUnit.StatusCountry">
                                        <li v-for="country in allCountries" :key="country.CountryId" 
                                            @click="selectCountry(country)" 
                                            :class="{'is-selected': formData.CountryId == country.CountryId }"
                                            :value="country.CountryId">{{ country.CountryName }}
                                        </li>                                       
                                    </ul>
                                </div>
                                <span class="icon-arrow" @click="administrativeUnit.StatusCountry = !administrativeUnit.StatusCountry"></span>
                            </div>
                        </div>
            
                        <div class="children-input">
                            <div class="half-children-input">                              
                                <label>Tỉnh/Thành phố</label>                               
                                <div class="select-content">
                                    <input type="text" v-model="administrativeUnit.ProvinceName"
                                        @input="onChangeProvince" placeholder="Nhập để tìm kiếm">

                                    <ul class="select-options" v-if="administrativeUnit.StatusProvince">
                                        <li v-for="province in allProvinces" :key="province.ProvinceId" 
                                            @click="selectProvince(province)" 
                                            :class="{'is-selected': formData.ProvinceId == province.ProvinceId }"
                                            :value="province.ProvinceId">{{ province.ProvinceName }}
                                        </li>                                       
                                    </ul>
                                </div>
                                <span class="icon-arrow" @click="administrativeUnit.StatusProvince = !administrativeUnit.StatusProvince"></span>
                            </div>

                            <div class="half-children-input right-child">
                                <label>Quận/Huyện</label>
                                <div class="select-content">
                                    <input type="text" v-model="administrativeUnit.DistrictName" 
                                        @input="onChangeDistrict" placeholder="Nhập để tìm kiếm">

                                    <ul class="select-options" v-if="administrativeUnit.StatusDistrict">
                                        <li v-for="district in allDistricts" :key="district.DistrictId" 
                                            @click="selectDistrict(district)" 
                                            :class="{'is-selected': formData.DistrictId == district.DistrictId }"
                                            :value="district.DistrictId">{{ district.DistrictName }}
                                        </li>                                       
                                    </ul>
                                </div>
                                <span class="icon-arrow" @click="administrativeUnit.StatusDistrict = !administrativeUnit.StatusDistrict"></span>
                            </div>
                        </div>
            
                        <div class="children-input">
                            <div class="half-children-input">
                                <label>Phường/Xã</label>
                                <div class="select-content">
                                    <input type="text" v-model="administrativeUnit.WardName" 
                                    @input="onChangeWard" placeholder="Nhập để tìm kiếm">

                                    <ul class="select-options" v-if="administrativeUnit.StatusWard">
                                        <li v-for="ward in allWards" :key="ward.WardId" 
                                            @click="selectWard(ward)" @input="onChangeWard"
                                            :class="{'is-selected': formData.WardId == ward.WardId }"
                                            :value="ward.WardId">{{ ward.WardName }}
                                        </li>                                       
                                    </ul>
                                </div>
                                <span class="icon-arrow" @click="administrativeUnit.StatusWard = !administrativeUnit.StatusWard"></span>
                            </div>
            
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
import axios from 'axios'

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
            administrativeUnit: {
                StatusCountry: false,
                CountryName: '',
                StatusProvince: false,
                ProvinceName: '',
                StatusDistrict: false, 
                DistrictName: '',
                StatusWard: false,
                WardName: '',
            }
        }
    },
    methods: {
        ...mapActions(['fetchCountries', 'fetchProvinces', 'fetchDistricts', 'fetchWards', 
        'fetchProvincesWithCountry', 'fetchDistrictsWithProvince', 'fetchWardsWithDistrict', 'dispatchStore']),
        //form submit khi lưu hoặc lưu và thêm mới
        saveData: function(action, e) {
            e.preventDefault();

            this.checkValidate(!this.formData.StoreCode, this.errors.StoreCode);
            this.checkValidate(!this.formData.StoreName, this.errors.StoreName);
            this.checkValidate(!this.formData.Address, this.errors.Address);

            if (this.formData.Status) {
                this.formData.Status = 1;
            } else {
                this.formData.Status = 0;
            }

            //Thực hiện gửi tới store -> để lưu
            this.dispatchStore(this.formData)
                .then(res => {
                    switch (res.MISACode) {
                        case MISACode.NOTVALID:
                            this.errors.StoreCode = [];
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
                                this.administrativeUnit = {
                                    StatusCountry: false,
                                    CountryName: '',
                                    StatusProvince: false,
                                    ProvinceName: '',
                                    StatusDistrict: false, 
                                    DistrictName: '',
                                    StatusWard: false,
                                    WardName: '',
                                };
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
        //Hiển thị tooltip khi có lỗi
        overStoreCode() {
            this.isTooltip.StoreCode = !this.isTooltip.StoreCode;
        },
        overStoreName() {
            this.isTooltip.StoreName = !this.isTooltip.StoreName;
        },
        overAddress() {
            this.isTooltip.Address = !this.isTooltip.Address;
        },
        //Ẩn tooltip lỗi
        leaveStoreCode() {
            this.isTooltip.StoreCode = !this.isTooltip.StoreCode;          
        },
        leaveStoreName() {
            this.isTooltip.StoreName = !this.isTooltip.StoreName;          
        },
        leaveAddress() {
            this.isTooltip.Address = !this.isTooltip.Address;          
        },
        //Bắt sự kiện khi select chọn quốc gia
        onChangeCountry() { 
            this.administrativeUnit.StatusCountry = true;
            let countryName = this.administrativeUnit.CountryName.toLowerCase();
            if (countryName) {
                let result = this.allCountries.filter(
                    item => item.CountryName.toLowerCase().indexOf(countryName) > -1
                );              
                this.$store.commit('setCountries', result);
            } else {
                this.$store.dispatch('fetchCountries');
            }
        },
        //Bắt sự kiện khi select chọn tỉnh/thành phố
        onChangeProvince() {
            this.administrativeUnit.StatusProvince = true;
            let provinceName = this.administrativeUnit.ProvinceName.toLowerCase();
            if (provinceName) {
                let result = this.allProvinces.filter(
                    item => item.ProvinceName.toLowerCase().indexOf(provinceName) > -1
                );              
                this.$store.commit('setProvinces', result);
            } else {
                this.$store.dispatch('fetchProvinces');
            }
        },
        //Bắt sự kiện khi select chọn quận/huyện
        onChangeDistrict() {
            this.administrativeUnit.StatusDistrict = true;
            let districtName = this.administrativeUnit.DistrictName.toLowerCase();
            if (districtName) {
                let result = this.allDistricts.filter(
                    item => item.DistrictName.toLowerCase().indexOf(districtName) > -1
                );              
                this.$store.commit('setDistricts', result);
            } else {
                this.$store.dispatch('fetchDistricts');
            }
        },
        //Bắt sự kiện khi select chọn phường/xã
        onChangeWard() {
            this.administrativeUnit.StatusWard = true;
            let wardName = this.administrativeUnit.WardName.toLowerCase();
            if (wardName) {
                let result = this.allWards.filter(
                    item => item.WardName.toLowerCase().indexOf(wardName) > -1
                );              
                this.$store.commit('setWards', result);
            } else {
                this.$store.dispatch('fetchWards');
            }
        },
        //Bắt sự kiện input nhập liệu trường bắt buộc thay đổi
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
        //Bắt sự kiện blur input các trường bắt buộc
        storeCodeBlur(e) {
            this.checkValidate(!e.target.value, this.errors.StoreCode);
        },
        storeNameBlur(e) {
            this.checkValidate(!e.target.value, this.errors.StoreName);
        },
        addressBlur(e) {
            this.checkValidate(!e.target.value, this.errors.Address);
        },
        //Hàm kiểm tra lỗi cho các trường
        checkValidate(condition, field) {
            if (condition) {
                field.push(PropertyName.INPUT_REQUIRED);
                return;
            } else {
                field = [];
            }
        },
        //Kiểm tra nhấn tab ở ô hủy bỏ
        onLastTab(e) {
            if (e.keyCode == 9) {
                e.preventDefault();
                this.$refs.StoreCode.focus();
            } else if(e.keyCode == 13) {
                this.hideListDetail();
            }
        },
        //Select country, province, ward
        selectCountry(country) {
            this.selectAdministrativeUnit("Country", country);
            this.fetchProvincesWithCountry(country.CountryId);
        },
        selectProvince(province) {
            this.selectAdministrativeUnit("Province", province);
            this.fetchDistrictsWithProvince(province.ProvinceId);
        },
        selectDistrict(district) {
            this.selectAdministrativeUnit("District", district);
            this.fetchWardsWithDistrict(district.DistrictId);
        },
        selectWard(ward) {
            this.selectAdministrativeUnit("Ward", ward);
        },
        selectAdministrativeUnit(Unit, unit) {
            let UnitName = Unit.concat('Name');
            let UnitId = Unit.concat('Id');
            let StatusUnit = 'Status'.concat(Unit);

            this.formData[UnitId] = unit[UnitId];
            this.administrativeUnit[StatusUnit] = false;
            this.administrativeUnit[UnitName] = unit[UnitName];
        }
    },
    computed: {
        ...mapGetters(['allCountries', 'allProvinces', 'allDistricts','allWards']),
    },
    created() {
        //set value cho form data khi update
        this.formData = Object.assign({}, this.store);

        if (this.formData.StoreId) {
            this.title = PropertyName.UPDATE_STORE;
            this.status = PropertyName.ACTIVE;
        } else {
            this.title = PropertyName.CREATE_STORE;
            if (this.formData.StoreCode) {
                this.title = PropertyName.REPLICATE_STORE;
            }
            this.status = PropertyName.UN_ACTIVE;
        }
    },
    mounted() {
        this.fetchCountries();

        //auto focus vào ô store code
        this.$refs.StoreCode.focus();

        //show administrative unit when edit store
        this.$nextTick(() => {  
            if (this.formData.CountryId) {
                axios.get('http://localhost:62509/api/v1/countries/' + this.formData.CountryId)
                    .then(res => {                   
                        this.selectCountry(res.data);
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }          
            
            if (this.formData.ProvinceId) {
                axios.get('http://localhost:62509/api/v1/provinces/' + this.formData.ProvinceId)
                    .then(res => {                   
                        this.selectProvince(res.data);
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
            
            if (this.formData.DistrictId) {
                axios.get('http://localhost:62509/api/v1/districts/' + this.formData.DistrictId)
                    .then(res => {                   
                        this.selectDistrict(res.data);
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
            
            if (this.formData.WardId) {
                axios.get('http://localhost:62509/api/v1/wards/' + this.formData.WardId)
                    .then(res => {                   
                        this.selectWard(res.data);
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }     
        });
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
    right: -850%;
    background-color: #FF4747;
    color: #fff;
    text-align: center;
    border-radius: 2px;
    padding: 10px 6px;
    font-size: 13px;
    display: block;
    box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.2);
}

.is-selected {
    background-color: #6b6f9d;
    color: white;
}
</style>