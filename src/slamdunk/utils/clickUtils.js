import {
    getClickPath
} from "./pathUtils";
import rng from 'uuid/dist/rng-browser';
import {
    generateEvent
} from './commonUtils';
export const click2Event = (e) => {
    window.te = e;
    const {
        eventId,
        eventType,
        eventValue
    } = getEventInfo(e);
    const event = generateEvent({
        id: generateRandomId(),
        type: 'click',
        event_timestamp: e.timeStamp,
        click_path: getClickPath(e.target),
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
        click_id: eventId,
        click_value: eventValue,
        click_type: eventType,
    });
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
const byteToHex = (() => {
    const hexs = [];
    for (let i = 0; i < 256; ++i) {
        hexs.push((i + 0x100).toString(16).substr(1));
    }
    return hexs;
})()

const generateRandomId = (length) => {
    const id = bytesToHex(rng())
    return id.substr(0, length)
}
const bytesToHex = (buf, offset) => {
    let i = offset || 0
    let bth = byteToHex
    // join used to fix memory issue caused by concatenation: https://bugs.chromium.org/p/v8/issues/detail?id=3175#c4
    return [
        bth[buf[i++]],
        bth[buf[i++]],
        bth[buf[i++]],
        bth[buf[i++]],
        bth[buf[i++]],
        bth[buf[i++]],
        bth[buf[i++]],
        bth[buf[i++]],
        bth[buf[i++]],
        bth[buf[i++]],
        bth[buf[i++]],
        bth[buf[i++]],
        bth[buf[i++]],
        bth[buf[i++]],
        bth[buf[i++]],
        bth[buf[i++]]
    ].join('')
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