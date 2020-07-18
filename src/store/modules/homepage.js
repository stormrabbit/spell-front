
import {
    retrieveCharactorList,
    retrieveCharactorById,
    createCharactor
} from '@request/charactorApi';
import {
    retrieveSpellsByClass
} from '@request/spellApi';
import {
    retrieveClasses
} from '@request/classesApi';
export default {
    namespaced: true,
    state: {
        spells: [],
        selectedCharactor: {},
        overlay: false,
        clsList: [],
        charactors: []
    },
    getters: {
        charactors: state => state.charactors,
        spells: state => state.spells,
        overlay: state => state.overlay,
        selectedCharactor: state => state.selectedCharactor,
        clsList: state => state.clsList
    },
    mutations: {
        putCharactors(state, charactors = []) {
            state.charactors = [...charactors];
        },
        putSpells(state, spells) {
            state.spells = [...spells]
        },
        putClasses(state, classes) {
            state.clsList = [...classes];
        },
        putCharactor(state, charactor) {
            state.selectedCharactor = {...state.selectedCharactor, ...charactor};
        },
        putLoading(state, loading) {
            state.overlay = loading;
        }
    },
    actions: {
        async createCharactor(_, charactor){
          await createCharactor(charactor);
        },
        async retrieveCharactors({commit, dispatch}) {
            const {
                data = []
            } = await retrieveCharactorList();
            commit('putCharactors', data);
            if(data && data.length) {
                dispatch('retrieveCharactorById',data[0].id )
            }
        },
        async retrieveClasses({commit}) {
            const {
                data = []
            } = await retrieveClasses();
            commit('putClasses', data);        
        },
        
        async retrieveCharactorById({commit}, id) {
            const data = await retrieveCharactorById(id);
            commit('putCharactor', data); 
        },
        async retrevePersonalSpells({commit}, {cls}) { 
            const {
                data = []
            } = await retrieveSpellsByClass(cls);
            commit('putSpells', data);
        }
    }
}