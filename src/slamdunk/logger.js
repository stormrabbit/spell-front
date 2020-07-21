class Logger {
    #_enable;
    #_console;
    constructor(enable) {
        this.#_enable = enable;
        this.#_console = console;
    }
    static getInstance(enable = false) {
        if(!this.instance) {
            this.instance = new Logger(enable);
        }
        return this.instance;
    }   
    info(val) {
        if(this.#_enable) {
            this.#_console.info(val);
        }
        
    }
  
}

export default Logger;