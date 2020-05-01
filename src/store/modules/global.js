export default {
    namespaced: true,
    state: {
        message: '',
        loading: false,
    },
    getters: {
        loading: state => state.loading,
        message: state => state.message,
    },
    mutations: {
        // 更新 dsp 列表数据
        putLoadingState(state, loading) {
            state.loading = loading;
        },
        // 更新 dsp 详情数据
        putMessage(state, message) {
            state.message = message;
        },
    },
    actions: {

    }
}