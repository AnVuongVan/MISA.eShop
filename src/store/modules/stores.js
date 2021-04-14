import axios from 'axios'

const API_URL = 'http://localhost:62509/api/v1/stores';

const state = {
    stores: [],
};

const getters = {
    allStores: state => state.stores,
};

const actions = {
    async fetchStores({ commit }) {
        const response = await axios.get(API_URL);
        commit('setStores', response.data);
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
    async queryStores({ commit }, data) {
        const params = {
            StoreCode: data.StoreCode, 
            StoreName: data.StoreName,
            Address: data.Address, 
            PhoneNumber: data.PhoneNumber,
            Status: data.Status
        };
        const response = await axios.get(`${API_URL}/search`, { params });
        console.log(response.data);
        commit('queryStores', response.data); 
    }
};

const mutations = {
    setStores: (state, stores) => state.stores = stores,
    dispatchStore: (state, store) => {
        const index = state.stores.findIndex(item => item.StoreId === store.StoreId);
        if (index !== -1) {
            state.stores.splice(index, 1, store);
        } else {
            state.stores.unshift(store);
        }
    },
    removeStore: (state, id) => state.stores = state.stores.filter(store => store.StoreId !== id),
    queryStores: (state, stores) => state.stores = stores,
};

export default {
    state,
    getters,
    actions,
    mutations
};