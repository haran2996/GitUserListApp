import { useEffect } from "react"
import { UserDetails } from "../components/UserDetails/UserDetails"
import { testData } from "../data"
import { useParams } from "react-router-dom"
import { getUsersDetailsAction } from "../store/actions"
import { useDispatch, useSelector } from "react-redux"
import { APIState } from "../types"
import { ErrorPage } from "../components/ErrorPage/ErrorPage"
import { Loading } from "../components/Loading/Loading"

export const UserDetailsPage = () => {
    const currentUserDetails = useSelector((state: any) => state.user.currentUserDetails)
    const userDetailApi = useSelector((state: any) => state.user.userDetailsApiState)
    const userId = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(
            getUsersDetailsAction({
                userId
            })
        );
    }, [userId]);
    if (userDetailApi === APIState.failed)
        return <ErrorPage />
    else if (userDetailApi !== APIState.completed)
        return <Loading />
    else
        return <UserDetails userDetails={currentUserDetails} />
}