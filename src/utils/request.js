import {
    get
} from 'axios';
export const requestGet = () => new Promise((res, rej) => {
    get('http://localhost:3000/spells?cls=ranger').then(result => res(result.data)).catch(ex => rej(ex));
})