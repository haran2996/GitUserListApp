import { createSlice } from "@reduxjs/toolkit";
import { APIState } from "../types";

const userSlice = createSlice({
    name: 'users',
    initialState: {
        currentUsersList: [],
        usersListApiState: APIState.notStarted,
        userDetailsApiState: APIState.notStarted,
        currentUserDetails: null,
        paginationUrls: {
            first: null,
            last: null,
            prev: null,
            next: null
        }
    },
    reducers: {
        setUsersListCompleted: (state, action) => {
            state.currentUsersList = action.payload.userList;
            state.paginationUrls = action.payload.paginationUrls;
            state.usersListApiState = APIState.completed
            return state;
        },
        setUsersDetailsCompleted: (state, action) => {
            state.currentUserDetails = action.payload.userDetails;
            state.userDetailsApiState = APIState.completed
            return state;
        },
        changeUserDetailsApiState: (state, action) => {
            state.userDetailsApiState = action.payload;
            return state;
        },
        changeUsersListApiState: (state, action) => {
            state.usersListApiState = action.payload;
            return state;
        }
    }
});

const { actions: userSliceActions, reducer: userSliceReducer } = userSlice
export { userSliceActions, userSliceReducer }