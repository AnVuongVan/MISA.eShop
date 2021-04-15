import axios from 'axios'

const API_URL = 'http://localhost:62509/api/v1/stores';

const state = {
    stores: [],
    globalStores: [],
    totalItems: 0
};

const getters = {
    allStores: state => state.stores,
};

const actions = {
    async fetchStores({ commit }) {
        const response = await axios.get(API_URL);
        commit('setStores', response.data);
        commit('setItems', response.data.length);
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
        const response = await axios({
            url: API_URL + '/search',
            method: 'POST',
            data: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            }
        });
        commit('queryStores', response.data); 
        commit('setItems', response.data.length);
    },
    async pagingStores({ commit }, data) {
        /*const params = {
            limit: data.limit, 
            offset: data.offset,          
        };
        const response = await axios.get(`${API_URL}/paging`, { params });
        commit('queryStores', response.data);*/

        let limit = data.limit;
        let offset = data.offset;

        let positionStart = limit * offset;
        let positionEnd = limit * (offset + 1);
        
        const response = this.state.stores.globalStores.slice(positionStart, positionEnd);
        commit('pagingStores', response);
    }
};

const mutations = {
    setStores: (state, stores) => {
        state.stores = stores;
        state.globalStores = stores;
    },
    setItems: (state, total) => state.totalItems = total,
    dispatchStore: (state, store) => {
        const index = state.stores.findIndex(item => item.StoreId === store.StoreId);
        if (index !== -1) {
            state.stores.splice(index, 1, store);
        } else {
            state.stores.unshift(store);
        }
    },
    removeStore: (state, id) => state.stores = state.stores.filter(store => store.StoreId !== id),
    queryStores: (state, stores) => {
        state.stores = stores;
        state.globalStores = stores;
    },
    pagingStores: (state, stores) => state.stores = stores,
}; 

export default {
    state,
    getters,
    actions,
    mutations
};