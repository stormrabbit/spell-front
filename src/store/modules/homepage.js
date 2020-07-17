import {
    get
} from './../../request/http';
export default {
    namespaced: true,
    state: {
        spells: [],
        selectedCharactor: {},
        overlay: false,
    },
    getters: {
        spells: state => {
            return state.spells
        },
        overlay: state => state.overlay,
        selectedCharactor: state => state.selectedCharactor,
    },
    mutations: {
        putSpells(state, spells) {
            state.spells = [
                ...spells
            ]
        },
        putCharactor(state, charactor) {
            state.selectedCharactor = {...state.selectedCharactor, ...charactor};
        },
        putLoading(state, loading) {
            state.overlay = loading;
        }
    },
    actions: {
        async retrieveCharactorById({commit}, id) {
            const result = await get(`/charactor/${id}`);
            commit('putCharactor', result); 
        },
        async retrevePersonalSpells({commit}, {cls}) { 
            const {
                data = []
            } = await get('/spells', {
                cls
            });
            commit('putSpells', data);
        }
    }
}