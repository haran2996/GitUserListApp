import { FC } from "react";
import { UserType } from "../../types";
import './UserDetails.css'
export const UserDetails: FC<{
    userDetails: UserType
}> = ({
    userDetails
}) => {
    return <div className="user-details-container">
        <div className="img-container">
            <img className="avatar" src={userDetails.avatar_url} alt={`${userDetails.name} avatar image`}/>
        </div>
        {userDetails.company&&<div className="text-feild-container">
            <span className="text-feild">
                Company: 
            </span>
            <span className="text-value">
                {userDetails.company}
            </span>
        </div>}
        {userDetails.twitter_username && <div className="text-feild-container">
            <span className="text-feild">
                TwitterUrl: 
            </span>
            <span className="text-value">
                {userDetails.twitter_username}
            </span>
        </div>}
        {userDetails.name?.split(' ')[0] && <div className="text-feild-container">
            <span className="text-feild">
                First Name: 
            </span>
            <span className="text-value">
                {userDetails.name.split(' ')[0]}
            </span>
        </div>}
       {userDetails.name?.split(' ')?.[1] && <div className="text-feild-container">
            <span className="text-feild">
                Last Name: 
            </span>
            <span className="text-value">
                {userDetails.name.split(' ')?.[1]}
            </span>
        </div>}
        <div className="text-feild-container">
            <span className="text-feild">
                Followers: 
            </span>
            <span className="text-value">
                {userDetails.followers}
            </span>
        </div>
        <div className="text-feild-container">
            <span className="text-feild">
                Following: 
            </span>
            <span className="text-value">
                {userDetails.following}
            </span>
        </div>
        <div className="text-feild-container">
            <span className="text-feild">
                Pulic Repos: 
            </span>
            <span className="text-value">
                {userDetails.public_repos}
            </span>
        </div>

    </div>
}