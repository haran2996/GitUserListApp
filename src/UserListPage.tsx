import { Pagination } from "./Pagination"
import { UsersList } from "./UsersList"
import { testData } from "./data"

export const UserListPage = () => {
    
    return <>
        <UsersList usersList={testData} handleUserClick={() => { console.log('clicked') }} />
        <Pagination totalPages={5} currentPage={1} disableButton={false} handlePageChange={() => {}}/>
    </>
}