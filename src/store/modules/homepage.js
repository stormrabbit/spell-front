// import {
//     requestGet
// } from '../../utils/request';

import {
    get
} from './../../request/http';
export default {
    namespaced: true,
    state: {
        spells: [],
        overlay: false,
    },
    getters: {
        spells: state => {
            return state.spells
        },
        overlay: state => state.overlay,
    },
    mutations: {
        putSpells(state, spells) {
            state.spells = [
                ...spells,
            ]
        },
        putLoading(state, loading) {
            state.overlay = loading;
        }
    },
    actions: {
        async retrevePersonalSpells({
            commit
        }, {
            cls
        }) {

            const result = await get('http://localhost:3000/spells', {
                cls
            });
            // const result = await requestGet('http://localhost:3000/spells', {
            //     cls
            // });
            commit('putSpells', result);
        }
    }
}