import {get, put} from './api';

const retrieveSpellsByClass= cls => get('spells', {cls});

const updateSpellToCharactor =(id, spell) => put(`personal/${id}`, spell)

export {
    retrieveSpellsByClass,
    updateSpellToCharactor
}