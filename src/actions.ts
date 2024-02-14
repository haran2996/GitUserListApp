import { ActionList } from "./types"

export const getUsersListAction = (payload) => {
    return {
        type: ActionList.getUsersList,
        payload
    }
}

export const getUsersDetailsAction = (payload) => {
    return {
        type: ActionList.getUsersDetails,
        payload
    }
}