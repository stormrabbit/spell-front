import factory from './factory';

const Listener = factory(
    () => {
        const registerClickListener = () => {
            window.addEventListener('click', e => {
                window.logger.info(e);
            })
        };
        const registerLifecycleListener = () => {
            document.addEventListener("DOMContentLoaded",e => window.logger.info(e));
            document.addEventListener('load', e =>  window.logger.info(e))
            document.addEventListener('unload', e =>  window.logger.info(e))
        }
        registerClickListener();
        registerLifecycleListener();
        return {}
    }
);

export default Listener;