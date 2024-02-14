import { useEffect, useState } from "react"
import { Pagination } from "./Pagination"
import { UsersList } from "./UsersList"
import { testData } from "./data"
import { useDispatch, useSelector } from "react-redux"
import { getUsersListAction } from "./actions"
import { APIState } from "./types"
import { Loading } from "./Loading"

export const UserListPage = () => {
    const apiState = useSelector((state: any) =>  state.user.userDetailsApiState)
    const userList = useSelector((state: any) =>  state.user.currentUsersList)
    const paginationUrls = useSelector((state: any) =>  state.user.paginationUrls)
    const [disableNavigation, setDisableNavigation] = useState<boolean>(true);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUsersListAction({
            url: 'https://api.github.com/users?per_page=10'
        }))
    }, []);
    useEffect(() => {
        if(apiState === APIState.completed) {
            setDisableNavigation(false);
        }
    }, [apiState])

    return <>
        { (apiState === APIState.completed) ?
            <UsersList usersList={userList} handleUserClick={() => { console.log('user details clicked') }} /> : <Loading/>
        }
        <Pagination currentPage={currentPage} disableButton={disableNavigation} paginationUrls={paginationUrls} handlePaginationClick={(val)=>{
            setDisableNavigation(true);
            dispatch(getUsersListAction({
                url: val === 'first' ? 'https://api.github.com/users?per_page=10' : paginationUrls[val]
            }));
            setCurrentPage(pageNumb => {
                if(val === 'first')
                    return 1;
                if(val==='next')
                    return pageNumb+1
                if(val==='prev')
                    return pageNumb-1
            })
        }}/>
    </>
}