import axios from 'axios'

const API_URL = 'http://localhost:62509/api/v1/stores';

const state = {
    stores: [],
    totalRecord: 0,
    totalPage: 0,
    store: {},
    StoreCode: '',
    StoreName: '',
    Address: '',
    PhoneNumber: '',
    Status: 2,
    limit: 50,
    offset: 1,
};

const getters = {
    allStores: state => state.stores,
};

const actions = {
    async fetchStores({ commit }) {
        const response = await axios.get(API_URL);
        commit('setStores', response.data);
        commit('setTotalRecord', response.data.length);
    },

    async fetchOneStore({ commit }, id) {
        const response = await axios.get(`${API_URL}/${id}`);
        commit('setStore', response.data);
        return response.data;
    },

    async dispatchStore({ commit }, store) {
        var method = 'POST';
        var url = API_URL;

        if (store.StoreId) {
            method = 'PUT';
            url += '/' + store.StoreId;
        }

        try {
            const response = await axios({
                url: url,
                method: method,
                data: JSON.stringify(store),
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                }
            });
            
            commit('dispatchStore', response.data.Body);
            return response.data;
        } catch (err) {
            return err.response.data;
        }
    },

    async deleteStore({ commit }, id) {
        const response = await axios.delete(`${API_URL}/${id}`);
        if (response.data.MISACode == 200) {
            commit('removeStore', id);
        } 
    },

    async filterStores({ commit }) {
        const params = {
            Store: {
                StoreCode: state.StoreCode,
                StoreName: state.StoreName,
                Address: state.Address,
                PhoneNumber: state.PhoneNumber,
                Status: state.Status
            },
            limit: state.limit, 
            offset: state.offset,          
        };

        const response = await axios({
            url: API_URL + '/filter',
            method: 'POST',
            data: JSON.stringify(params),
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            }
        });

        commit('setTotalRecord', response.data.Result.TotalRecord);
        commit('setTotalPage', response.data.Result.TotalPage);
        commit('filterStores', response.data.Result.Data);
    },

    async updateFilterStore({ commit }, data) {
        commit('updateFilterStore', data);
    },
    async updateFilterPaging({ commit }, data) {
        commit('updateFilterPaging', data);
    }
};

const mutations = {
    setStores: (state, stores) => state.stores = stores,
    setStore: (state, store) => state.store = store,
    dispatchStore: (state, store) => {
        const index = state.stores.findIndex(item => item.StoreId === store.StoreId);
        if (index !== -1) {
            state.stores.splice(index, 1, store);
        } else {
            state.stores.unshift(store);
        }
    },
    removeStore: (state, id) => state.stores = state.stores.filter(store => store.StoreId !== id),
    filterStores: (state, stores) => state.stores = stores,
    updateFilterStore: (state, data) => {
        state.StoreCode = data.StoreCode,
        state.StoreName = data.StoreName,
        state.Address = data.Address,
        state.PhoneNumber = data.PhoneNumber,
        state.Status = data.Status
    },
    updateFilterPaging: (state, data) => {
        state.limit = data.limit,
        state.offset = data.offset
    },
    setTotalRecord: (state, totalRecord) => state.totalRecord = totalRecord,
    setTotalPage: (state, totalPage) => state.totalPage = totalPage
}; 

export default {
    state,
    getters,
    actions,
    mutations
};