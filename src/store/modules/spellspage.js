import {
    requestPut
} from '../../utils/request';
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
        async updateSpell({
            commit
        }, {
            id,
            spell,
        }) {
            const result = await requestPut(`http://localhost:3000/personal/${id}`, {}, {
                spell
            });
            commit('putSpells', result);
        }
    }
}