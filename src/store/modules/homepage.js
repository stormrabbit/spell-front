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
        }, {
            cls
        }) {
            const result = await requestGet('http://localhost:3000/spells', {
                cls
            });
            commit('putSpells', result);
        }
    }
}