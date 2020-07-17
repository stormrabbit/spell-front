import {get} from './api';

const retrieveCharactorList = () => get('charactor/list');

const retrieveCharactorById = id => get(`/charactor/${id}`)

export {
    retrieveCharactorList,
    retrieveCharactorById
}