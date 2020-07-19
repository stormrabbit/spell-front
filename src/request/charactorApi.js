import {get, post, put, del} from './api';

const retrieveCharactorList = () => get('charactor/list');

const retrieveCharactorById = id => get(`/charactor/${id}`)

const createCharactor = charactor => post(`/charactor/create`, charactor);

const updateCharactor = charactor => put(`/charactor/${charactor._id}`, charactor);
const deleteCharactor = id => del(`/charactor/${id}`);

export {
    createCharactor,
    retrieveCharactorList,
    retrieveCharactorById,
    updateCharactor,
    deleteCharactor

}