import {get} from './api';


const retrieveClasses = ()=> get(`/classes`)

export {
    retrieveClasses
}