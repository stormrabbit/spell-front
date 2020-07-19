import {
    updateSpellToCharactor
} from '../../request/spellApi';
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
            const result = await updateSpellToCharactor(id , spell);
            commit('putSpells', result);
        }
    }
}