import {
    put
} from '../../request/api';
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
            const result = await put(`http://angrykitty.link:38080/app/mock/16/personal/${id}`, {}, spell);
            commit('putSpells', result);
        }
    }
}