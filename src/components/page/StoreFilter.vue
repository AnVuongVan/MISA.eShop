<template>
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
                    <input type="text" v-model="storeCode" @input="getQuery">
                </div>
            </th>

            <th class="name">
                <span>Tên cửa hàng</span>
                <div class="search-box">
                    <select>
                        <option value="approximate">*</option>
                        <option value="exactly">=</option>
                    </select>
                    <input type="text" v-model="storeName" @input="getQuery">
                </div>
            </th>

            <th class="address">
                <span>Địa chỉ</span>
                <div class="search-box">
                    <select>
                        <option value="approximate">*</option>
                        <option value="exactly">=</option>
                    </select>
                    <input type="text" v-model="address" @input="getQuery">
                </div>
            </th>

            <th class="phone">
                <span>Số điện thoại</span>
                <div class="search-box">
                    <select>
                        <option value="approximate">*</option>
                        <option value="exactly">=</option>
                    </select>
                    <input type="text" v-model="phoneNumber" @input="getQuery">
                </div>
            </th>
            
            <th class="status">
                <span>Trạng thái</span>
                <div class="search-box">
                    <select v-model="status" @change="getQuery">
                        <option value=2>Tất cả</option>
                        <option value=1>Đang hoạt động</option>
                        <option value=0>Ngừng hoạt động</option>
                    </select>
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
            storeCode: '',
            storeName: '',
            address: '',
            phoneNumber: '',
            status: 2
        }
    },
    methods: {
        //Hàm thực hiện mỗi khi input thay đổi
        getQuery: debounce(function () {
            const data = {
                StoreCode: this.storeCode,
                StoreName: this.storeName,
                Address: this.address,
                PhoneNumber: this.phoneNumber,
                Status: this.status
            }                  
            this.$store.dispatch('queryStores', data);          
        }, 500)
    }
}
</script>

<style scoped>
</style>