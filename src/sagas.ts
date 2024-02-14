import {all, call, put, takeLatest} from 'redux-saga/effects';
import { APIState, ActionList, UserListType } from './types';
import { userSliceActions } from './reducer';

function callGetUserApi({ login }: { login: string }) {
    return fetch(`https://api.github.com/users/${login}`, {
        method: 'get',
    }).then(resp => resp.json()).catch(error => ({ error }))
}

function callGetUserListApi(url: string) {
    return fetch(url, {
        method: 'get',
    }).catch(error => ({ error }))
}

function* getUsersList(action) {
    try {
        yield put(userSliceActions.changeUserDetailsApiState(APIState.inProgress))
        const { url } = action.payload;
        const userListResponse: Response = yield call(callGetUserListApi, url);
        const userList = yield userListResponse.json();
        const linkHeader = userListResponse.headers.get('link');
        const paginationUrls = {}
        if(linkHeader) {
            const itr = linkHeader.matchAll(/<([^>]+)>; rel="([a-z]+)"/g);
            let value = itr.next().value;
            while(value) {
                const fullUrl = value?.[1]
                const typeOfNavigation = value?.[2]
                const positionOfOpenCurly = fullUrl?.indexOf('{');
                const url = fullUrl?.substring(0, positionOfOpenCurly >= 0 ? positionOfOpenCurly : fullUrl.length);
                if (typeOfNavigation && url) {
                    paginationUrls[typeOfNavigation] = url;
                }
                value=itr.next().value;
            }
        }
        const userDetailsList = yield all(userList.map(user => call(callGetUserApi, { login: user.login }))
        )
        yield put(userSliceActions.getUsersListCompleted({ userList: userDetailsList, paginationUrls }))
    }
    catch (error) {
        console.log('error caught in getUsersList',error)
        yield put(userSliceActions.changeUserDetailsApiState(APIState.failed))
    }
}

export function* allSagas() {
    yield takeLatest(ActionList.getUsersList, getUsersList);
}