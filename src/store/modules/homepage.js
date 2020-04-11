export default {
    namespaced: true,
    state: {
        test: 1,
    },
    getters: {
        test: state => state.test,
    },
    mutations: {
        putTest(state, test) {
            state.test = {
                ...state.test,
                ...test,
            }
        }
    },
    actions: {
        testActions({
            commit
        }, test) {
            commit('putTest', test);
        }
    }
}