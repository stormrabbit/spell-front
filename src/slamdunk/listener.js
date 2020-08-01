import factory from './factory';
import Logger from './logger';
import Sender from './sender';
const sender = Sender();
const logger = Logger();
import {
  click2Event
} from './utils/clickUtils';
const Listener = factory(
    () => {
        const registerClickListener = () => {
            window.addEventListener('click', e => {
                const event = click2Event(e);
                sender.send(event);
            })
        };
        const registerLifecycleListener = () => {
            window.addEventListener("DOMContentLoaded",e => {
              logger.info(e);
            //   sender.send(e);
              sender.sendBeacon(e);
            //   sender.send(e);
            });
        }
        const registerPopstateListener = () => {
            window.addEventListener('popstate', e => {
                logger.info(e);
                
                sender.sendBeacon(e);
                // sender.send(e);
            });
        }
        registerClickListener();
        registerLifecycleListener();
        registerPopstateListener();
        
        
        return {}
    }
);

export default Listener;