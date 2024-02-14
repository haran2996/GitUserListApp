import { createSlice } from "@reduxjs/toolkit";
import { APIState } from "./types";

const userSlice = createSlice({
    name: 'users',
    initialState: {
        currentUsersList: [],
        userDetailsApiState: APIState.notStarted,
        paginationUrls: {
            first: null,
            last: null,
            prev: null,
            next: null
        }
    },
    reducers: {
        getUsersListCompleted: (state, action) => {
            state.currentUsersList = action.payload.userList;
            state.paginationUrls = action.payload.paginationUrls;
            state.userDetailsApiState = APIState.completed
            return state;
        },
        changeUserDetailsApiState: (state, action) => {
            state.userDetailsApiState = action.payload;
            return state;
        }
    }
});

const { actions: userSliceActions, reducer: userSliceReducer } = userSlice
export { userSliceActions, userSliceReducer }