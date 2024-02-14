export type UserType = {
    login: string,
    id: number,
    avatar_url: string,
    name: string,
    twitter_username: string,
    public_repos: number,
    following_url: string,
    following: number,
    followers_url: string,
    followers: number
}

export enum APIState {
    inProgress = 'In Progress',
    notStarted = 'Not Started',
    completed = 'Completed',
    failed = 'Failed'
}

export enum ActionList {
    getUsersList = 'GET_USERS_LIST',
    getUsersDetails = 'GET_USERS_DETAILS',
}

export type UserListType = Partial<UserType>[];
