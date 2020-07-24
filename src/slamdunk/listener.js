import factory from './factory';

const Listener = factory(
    () => {
        const registerClickListener = () => {
            window.addEventListener('click', e => {
                const event = _getEvent(e);
                window.logger.info(e);
                window.logger.info(event);
            })
        };
        const registerLifecycleListener = () => {
            window.addEventListener("DOMContentLoaded",e => window.logger.info(e));
            window.addEventListener('load', e =>  window.logger.info(e))
            window.addEventListener('unload', e =>  window.logger.info(e))
        }
        const registerPopstateListener = () => {
            window.addEventListener('popstate', e => {
                window.logger.info(e)
            });
        }
        registerClickListener();
        registerLifecycleListener();
        registerPopstateListener();

        const _getEvent = (e) => {
            const eventPath = e.path && e.path.length > 0 ? e.path : _getEventPath(e);
            const eventPathLength = eventPath.length > 0 ? eventPath.length:0;
            const eventData = {};
            if(eventPathLength <4) {
                const nodeNames = eventPath.map(dom => dom.nodeName).join(',');
                const outerHTML = (e && e.tareget && e.tareget.outerHTML) ?e.tareget.outerHTML.replace(/(<.*?>)(.*)/, '$1'):'';
                return {
                    eventData: `${outerHTML} | ${nodeNames} | ${eventPath}` 
                }
            }
            for (let i = 0; i < eventPathLength; i++) {
                if (i > eventPathLength - 3) { // body ...
                  break
                }
                const dom = eventPath[i]
                const validTargets = 'a|button|select|input|textarea'.split('|')
                if (validTargets.includes(dom.nodeName.toLocaleLowerCase())) {
                  eventData['event_type'] = dom.nodeName.toLocaleLowerCase()
                  return {
                    eventData
                  }
                }
              }
            return {};
        }
        const _getEventPath = (e) => {
            let eventPath = []
            if (e && e.target) {
              let tempDom = e.target
              eventPath.push(tempDom)
              while (tempDom.parentElement) {
                tempDom = tempDom.parentElement
                eventPath.push(tempDom)
              }
              eventPath.push(document)
              eventPath.push(window)
          
              return eventPath
            }
        }
        return {}
    }
);

export default Listener;