import {
    requestGet
} from './../../utils/request';
export default {
    namespaced: true,
    state: {
        spells: []
    },
    getters: {
        spells: state => {
            return state.spells
        },
    },
    mutations: {
        putSpells(state, spells) {
            state.spells = [
                ...spells,
            ]
        }
    },
    actions: {
        async retrevePersonalSpells({
            commit
        }) {
            const result = await requestGet();
            commit('putSpells', result);
        }
    }
}