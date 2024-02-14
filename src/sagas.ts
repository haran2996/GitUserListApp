import {takeLatest} from 'redux-saga/effects';
import { ActionList } from './types';

function callGetUserApi({ login }: { login: string }) {
    return fetch(`https://api.github.com/users/${login}`, {
        method: 'get',
    }).then(resp => resp.json()).catch(error => ({ error }))
}

function callGetUserListApi({ perPage, since }: { perPage: number, since: number }) {
    return fetch(`https://api.github.com/users?per_page=${perPage}&since=${since}`, {
        method: 'get',
    }).then(resp => resp.json()).catch(error => ({ error }))
}

function* getUsersList() {
    
}

export function* allSagas() {
    yield takeLatest(ActionList.getUsersList, getUsersList);
}