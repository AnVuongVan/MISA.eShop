<template>
    <thead>
        <tr>
            <th class="code">
                <span>Mã cửa hàng</span>
                <div class="search-box">
                    <div class="select-filter">
                        <span>*</span>
                        <ul class="select-filter-options" v-if="false">
                            <li v-for="option in this.filterOptions" :key="option.id">{{ option.body }}</li>                                          
                        </ul>
                    </div>
                    <input type="text" v-model="inputFilter.storeCode" @input="getQuery">
                </div>
            </th>

            <th class="name">
                <span>Tên cửa hàng</span>
                <div class="search-box">
                    <div class="select-filter">
                        <span>*</span>
                        <ul class="select-filter-options" v-if="false">
                            <li v-for="option in this.filterOptions" :key="option.id">{{ option.body }}</li>                                          
                        </ul>
                    </div>
                    <input type="text" v-model="inputFilter.storeName" @input="getQuery">
                </div>
            </th>

            <th class="address">
                <span>Địa chỉ</span>
                <div class="search-box">
                    <div class="select-filter">
                        <span>*</span>
                        <ul class="select-filter-options" v-if="false">
                            <li v-for="option in this.filterOptions" :key="option.id">{{ option.body }}</li>                                          
                        </ul>
                    </div>
                    <input type="text" v-model="inputFilter.address" @input="getQuery">
                </div>
            </th>

            <th class="phone">
                <span>Số điện thoại</span>
                <div class="search-box">
                    <div class="select-filter">
                        <span>*</span>
                        <ul class="select-filter-options" v-if="false">
                            <li v-for="option in this.filterOptions" :key="option.id">{{ option.body }}</li>                                        
                        </ul>
                    </div>
                    <input type="text" v-model="inputFilter.phoneNumber" @input="getQuery">
                </div>
            </th>
            
            <th class="status">
                <span>Trạng thái</span>
                <div class="search-box">
                    <div class="select-filter-status">
                        <span @click="inputFilter.status.visible = !inputFilter.status.visible" v-text="this.inputFilter.status.StatusName" ></span>
                        <ul class="select-filter-options select-status" v-if="inputFilter.status.visible">
                            <li v-for="option in this.filterSelects" :key="option.id" @click="chooseOption(option)"
                                :class="{'is-selected': inputFilter.status.StatusValue == option.id }">
                                {{ option.body }}
                            </li>                                                             
                        </ul>
                    </div>
                </div>
            </th>
        </tr>
    </thead>
</template>

<script>
import debounce from 'debounce';

export default {
    name: 'CustomerFilter',
    data() {
        return {
            inputFilter: {
                storeCode: '',
                storeName: '',
                address: '',
                phoneNumber: '',
                status: {
                    visible: false,
                    StatusName: 'Tất cả',
                    StatusValue: 2
                }
            },
            filterOptions: [
                { id: 1, body: '*' },
                { id: 2, body: '=' },
                { id: 3, body: '>=' },
                { id: 4, body: '<=' }
            ],
            filterSelects: [
                { id: 2, body: 'Tất cả' },
                { id: 1, body: 'Đang hoạt động' },
                { id: 0, body: 'Ngừng hoạt động' }
            ]
        }
    },
    methods: {
        //Hàm thực hiện mỗi khi input thay đổi
        getQuery: debounce(function () {
            const data = {
                StoreCode: this.inputFilter.storeCode,
                StoreName: this.inputFilter.storeName,
                Address: this.inputFilter.address,
                PhoneNumber: this.inputFilter.phoneNumber,
                Status: this.inputFilter.status.StatusValue,
            }                
            this.$store.dispatch('updateFilterStore', data);  
            this.$store.dispatch('filterStores');          
        }, 500),
        chooseOption(option) {
            this.inputFilter.status.StatusName = option.body;   
            this.inputFilter.status.StatusValue = option.id;
            this.inputFilter.status.visible = false;
            this.getQuery();
        },
    }
}
</script>

<style scoped>
.is-selected {
    background-color: #6b6f9d;
    color: white;
}
</style>