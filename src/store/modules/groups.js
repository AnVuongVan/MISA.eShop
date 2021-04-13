import axios from 'axios'

const API_COUNTRY_URL = 'http://localhost:62509/api/v1/countries';
//const API_PROVINCE_URL = 'http://localhost:62509/api/v1/provinces/country';
//const API_DISTRICT_URL = 'http://localhost:62509/api/v1/districts/province';
//const API_WARD_URL = 'http://localhost:62509/api/v1/wards/district';

const state = {
    countries: [],
};

const getters = {
    allCountries: state => state.countries,
};

const actions = {
    async fetchCountries({ commit }) {
        const response = await axios.get(API_COUNTRY_URL);
        commit('setCountries', response.data);
    },
};

const mutations = {
    setCountries: (state, countries) => state.countries = countries,
};

export default {
    state,
    getters,
    actions,
    mutations
};