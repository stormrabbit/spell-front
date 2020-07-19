
import {
    retrieveCharactorList,
    retrieveCharactorById,
    createCharactor,
    updateCharactor,
    deleteCharactor
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
        async deleteCharactor(_, id) {
            await deleteCharactor(id);
        },
        async createCharactor(_, charactor){
          await createCharactor(charactor);
        },
        async updateCharactor(_, charactor) {
            await updateCharactor(charactor);
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
        
        async retrieveCharactorById({commit, dispatch}, id) {
            const charactor = await retrieveCharactorById(id);
            commit('putCharactor', charactor); 
            if(charactor && charactor.cls) {
                dispatch('retreveSpellsByClass', {cls:charactor.cls});
            }
        },
        async retreveSpellsByClass({commit}, {cls}) { 
            const {
                data = []
            } = await retrieveSpellsByClass(cls);
            commit('putSpells', data);
        }
    }
}