import axios from 'axios'
import MISACode from '../constant/code'

const API_COUNTRY_URL = 'http://localhost:62509/api/v1/countries';
const API_PROVINCE_URL = 'http://localhost:62509/api/v1/provinces';
const API_DISTRICT_URL = 'http://localhost:62509/api/v1/districts';
const API_WARD_URL = 'http://localhost:62509/api/v1/wards';

const state = {
    countries: [],
    provinces: [],
    districts: [],
    wards: []
};

const getters = {
    allCountries: state => state.countries,
    allProvinces: state => state.provinces,
    allDistricts: state => state.districts,
    allWards: state => state.wards,
};

const actions = {
    async fetchCountries({ commit }) {
        const response = await axios.get(API_COUNTRY_URL);
        commit('setCountries', response.data);
    },

    async fetchProvinces({ commit }) {
        const response = await axios.get(API_PROVINCE_URL);
        commit('setProvinces', response.data);
    },
    async fetchProvincesWithCountry({ commit }, id) {
        const params = {
            countryId: id, 
        };
        const response = await axios.get(`${API_PROVINCE_URL}/country`, { params });
        
        if (response.status == MISACode.NO_CONTENT) {
            commit('setDistricts', response.data);
            commit('setWards', response.data);
        }
        commit('setProvinces', response.data);
    },

    async fetchDistricts({ commit }) {
        const response = await axios.get(API_DISTRICT_URL);
        commit('setDistricts', response.data);
    },
    async fetchDistrictsWithProvince({ commit }, id) {
        const params = {
            provinceId: id, 
        };
        const response = await axios.get(`${API_DISTRICT_URL}/province`, { params });

        if (response.status == MISACode.NO_CONTENT) {
            commit('setWards', response.data);
        }
        commit('setDistricts', response.data);
    },

    async fetchWards({ commit }) {
        const response = await axios.get(API_WARD_URL);
        commit('setWards', response.data);
    },
    async fetchWardsWithDistrict({ commit }, id) {
        const params = {
            districtId: id, 
        };
        const response = await axios.get(`${API_WARD_URL}/district`, { params });
        commit('setWards', response.data);
    },
};

const mutations = {
    setCountries: (state, countries) => state.countries = countries,
    setProvinces: (state, provinces) => state.provinces = provinces,
    setDistricts: (state, districts) => state.districts = districts,
    setWards: (state, wards) => state.wards = wards,
};

export default {
    state,
    getters,
    actions,
    mutations
};