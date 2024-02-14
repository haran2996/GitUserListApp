import { useEffect, useState } from "react"
import { Pagination } from "../components/Pagination/Pagination"
import { UsersList } from "../components/UserLists/UsersList"
import { useDispatch, useSelector } from "react-redux"
import { getUsersListAction } from "../store/actions"
import { APIState } from "../types"
import { Loading } from "../components/Loading/Loading"
import { ErrorPage } from "../components/ErrorPage/ErrorPage"
import { useNavigate } from "react-router-dom"

export const UserListPage = () => {
    const navigate = useNavigate();
    const apiState = useSelector((state: any) => state.user.usersListApiState)
    const userList = useSelector((state: any) => state.user.currentUsersList)
    const paginationUrls = useSelector((state: any) => state.user.paginationUrls)
    const [disableNavigation, setDisableNavigation] = useState<boolean>(true);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUsersListAction({
            url: 'https://api.github.com/users?per_page=10'
        }))
    }, []);
    useEffect(() => {
        if (apiState === APIState.completed) {
            setDisableNavigation(false);
        }
    }, [apiState])
    if (apiState === APIState.failed) {
        return <ErrorPage />
    }

    return <>
        {(apiState === APIState.completed) ?
            <UsersList usersList={userList} handleUserClick={(user: any) => { navigate(`/${user.login}`) }} /> : <Loading />
        }
        <Pagination currentPage={currentPage} disableButton={disableNavigation} paginationUrls={paginationUrls} handlePaginationClick={(val) => {
            setDisableNavigation(true);
            dispatch(getUsersListAction({
                url: val === 'first' ? 'https://api.github.com/users?per_page=10' : paginationUrls[val]
            }));
            setCurrentPage(pageNumb => {
                if (val === 'first')
                    return 1;
                if (val === 'next')
                    return pageNumb + 1
                if (val === 'prev')
                    return pageNumb - 1
            })
        }} />
    </>
}