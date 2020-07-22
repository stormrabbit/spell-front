const factory  =(init) => {
    let instance;
    return () => {
        if(!instance) {
            instance = init();
        }
        return instance;
    }
};

export default factory;