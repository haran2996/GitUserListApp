import { FC } from "react";
import { UserType } from "../../types";
import './UsersList.css';
import * as React from "react";
export const UsersList: FC<{ usersList: UserType[], handleUserClick: Function }> = ({ usersList, handleUserClick }) => {
    return <div className="users-list">
        {
            usersList.map(user => <div key={user.login} className="user-container" onClick={() => handleUserClick(user)}>
                <div className="img-container">
                    <img className="avatar-img" src={user.avatar_url} alt={`${user.name} avatar`} />
                </div>
                <div className="text-container">
                    <span className="text-field">Username: </span>
                    <span className="text-value">{user.login}</span>
                </div>
                <div className="text-container">
                    <span className="text-field">First Name: </span>
                    <span className="text-value">{user.name?.split(' ')[0]}</span>
                </div>
                <div className="text-container">
                    <span className="text-field">Last Name: </span>
                    <span className="text-value">{user.name?.split(' ')[1]}</span>
                </div>
            </div>)
        }
    </div>
}