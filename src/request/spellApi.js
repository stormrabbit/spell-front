import {get} from './api';

const retrieveSpellsByClass= cls => get('spells', {cls});


export {
    retrieveSpellsByClass
}