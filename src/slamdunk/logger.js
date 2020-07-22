import factory from './factory';
const Logger = factory(() => {
    const {
        info
    } = console;
   return {info: process.env.VUE_APP_ADMIN_LOG ? info: val => val};
});
export default Logger;