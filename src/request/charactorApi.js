import {get, post} from './api';

const retrieveCharactorList = () => get('charactor/list');

const retrieveCharactorById = id => get(`/charactor/${id}`)

const createCharactor = charactor => post(`/charactor/create`, charactor)

export {
    retrieveCharactorList,
    retrieveCharactorById,
    createCharactor
}