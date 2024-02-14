import { all, call, put, takeLatest } from 'redux-saga/effects';
import { APIState, ActionList, UserListType, UserType } from '../types';
import { userSliceActions } from './reducer';
import { testData } from '../data';

function callGetUserApi({ login }: { login: string }) {
    return fetch(`https://api.github.com/users/${login}`, {
        method: 'get',
    }).then(resp => {
        if (resp.ok)
            return resp.json()
        throw resp;
    }).catch(error => ({ error }))
}

function callGetUserListApi(url: string) {
    return fetch(url, {
        method: 'get',
    })
}

function* getUsersList(action) {
    try {
        yield put(userSliceActions.changeUsersListApiState(APIState.inProgress))
        const { url } = action.payload;
        const userListResponse: Response = yield call(callGetUserListApi, url);
        if (!userListResponse.ok) {
            yield put(userSliceActions.changeUsersListApiState(APIState.failed))
            return;
        }
        const userList = yield userListResponse.json();
        const linkHeader = userListResponse.headers.get('link');
        const paginationUrls = {}
        if (linkHeader) {
            const itr = linkHeader.matchAll(/<([^>]+)>; rel="([a-z]+)"/g);
            let value = itr.next().value;
            while (value) {
                const fullUrl = value?.[1]
                const typeOfNavigation = value?.[2]
                const positionOfOpenCurly = fullUrl?.indexOf('{');
                const url = fullUrl?.substring(0, positionOfOpenCurly >= 0 ? positionOfOpenCurly : fullUrl.length);
                if (typeOfNavigation && url) {
                    paginationUrls[typeOfNavigation] = url;
                }
                value = itr.next().value;
            }
        }
        const userDetailsList = yield all(userList.map(user => call(callGetUserApi, { login: user.login }))
        )
        yield put(userSliceActions.setUsersListCompleted({ userList: userDetailsList?.filter(val => !val.error), paginationUrls }))
    }
    catch (error) {
        console.log('error caught in getUsersList', error)
        yield put(userSliceActions.changeUsersListApiState(APIState.failed))
    }
}

function* getUsersDetails(action) {
    try {
        const { login } = action.payload
        yield put(userSliceActions.changeUserDetailsApiState(APIState.inProgress))
        const userDetails: UserType & { error: Response } = yield call(callGetUserApi, { login });
        if (!userDetails.error)
            yield put(userSliceActions.setUsersDetailsCompleted({ userDetails }))
        else {
            console.log('Unable to fetch user details', userDetails.error)
            yield put(userSliceActions.changeUserDetailsApiState(APIState.failed))
        }
    }
    catch (error) {
        console.log('error caught in getUsersDetails', error)
        yield put(userSliceActions.changeUserDetailsApiState(APIState.failed))
    }
}

export function* allSagas() {
    yield takeLatest(ActionList.getUsersList, getUsersList);
    yield takeLatest(ActionList.getUsersDetails, getUsersDetails);
}