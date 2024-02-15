import { useEffect } from "react"
import { UserDetails } from "../components/UserDetails/UserDetails"
import { testData } from "../data"
import { useNavigate, useParams } from "react-router-dom"
import { getUsersDetailsAction } from "../store/actions"
import { useDispatch, useSelector } from "react-redux"
import { APIState } from "../types"
import { ErrorPage } from "../components/ErrorPage/ErrorPage"
import { Loading } from "../components/Loading/Loading"

export const UserDetailsPage = () => {
    const currentUserDetails = useSelector((state: any) => state.user.currentUserDetails)
    const userDetailApi = useSelector((state: any) => state.user.userDetailsApiState)
    const navigate = useNavigate();
    const { id: login } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        if (login) {
            dispatch(
                getUsersDetailsAction({
                    login
                })
            );
        }
    }, [login]);
    const renderComp = () => {
        if (userDetailApi === APIState.failed)
            return <ErrorPage />
        else if (userDetailApi !== APIState.completed)
            return <Loading />
        else
            return <UserDetails userDetails={currentUserDetails} />
    }
    return <>
        <button onClick={() => navigate('/')}>Back</button>
        {renderComp()}
    </>
}