import factory from './factory';
import Logger from './logger';
import Sender from './sender';
const sender = Sender();
const logger = Logger();
import {
    click2Event
} from './utils/clickUtils';
import { generateEvent, getOSInfo } from './utils/commonUtils';
const Listener = factory(
    () => {
        const generateLoadEvent =()=> {
            const event = generateEvent({
                type: 'lifecycle',
                sub_type: 'load',
            })

            const OSInfo = getOSInfo();
            event.platform = OSInfo.platform || '';
            event.device = OSInfo.device || '';

            event.client = {};
            return event;
        }

        const generateUnloadEvent = () => {
            const event = generateEvent({
              type: 'lifecycle',
              sub_type: 'unload',
            });
            return event;
          }

        const registerClickListener = () => {
            window.addEventListener('click', e => {
                const event = click2Event(e);
                sender.send(event);
            })
        };
        const registerLifecycleListener = () => {
            window.addEventListener("DOMContentLoaded", () => {
                const event = generateLoadEvent();
                sender.send(event);
            });

            window.addEventListener("unload", () => {
                const event = generateUnloadEvent();
                sender.sendBeacon(event);
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