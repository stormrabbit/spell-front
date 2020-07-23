const factory  =(init = ()=>({})) => {
    let instance;
    return () => {
        if(!instance && (typeof init === 'function')) {
            instance = init();
        }
        return instance;
    }
};

export default factory;