import { getClickPath } from "./pathUtils";

export const click2Event = (e) => {
    window.te = e;
    const {
        eventId,
        eventType,
        eventValue
    } = getEventInfo(e);
    const event = generateEvent({
        type: 'click',
        event_timestamp: e.timeStamp,
        event_path: getClickPath(e.target),
        // client_x: e.clientX,
        // client_y: e.clientY,
        // layer_x: e.layerX,
        // layer_y: e.layerY,
        // offset_x: e.offsetX,
        // offset_y: e.offsetY,
        // page_x: e.pageX,
        // page_y: e.pageY,
        // screen_x: e.screenX,
        // screen_y: e.screenY,
        // screen_width: window.screen.width,
        // screen_height: window.screen.height,
        event_id: eventId,
        event_value: eventValue,
        event_type: eventType,
    });
    return event;
}

const generateEvent = (event = {
    type: '',
}) => {
    event.timestamp = Date.now();
    event.start = window.performance.now();

    return event;
}

const getEventInfo = (e) => {
    const {
        'sd-eventid': eventId,
        'sd-eventtype': eventType,
        'sd-eventvalue': eventValue
    } = e.target.attributes;
    if (eventId) {
        return {
            eventId,
            eventType,
            eventValue,
        }
    } else {
        return {
            eventType: e.target.nodeName.toLocaleLowerCase()
        }
    }

}

// const getEventPath = (e) => {
//     let eventPath = [];
//     if (e && e.target) {
//         let tempDom = e.target
//         eventPath.push(tempDom)
//         while (tempDom.parentElement) {
//             tempDom = tempDom.parentElement
//             eventPath.push(tempDom)
//         }
//         eventPath.push(document)
//         eventPath.push(window)

//         return eventPath
//     }
// }