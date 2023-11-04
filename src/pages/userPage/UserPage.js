import React from 'react';
import AddProduct from "../../components/AddProduct/AddProduct";
import {useAuth} from "../../components/hooks/user-auth";
import {useDispatch, useSelector} from "react-redux";
import {removeUser} from "../../store/authSlice";
import {Navigate} from "react-router-dom";
import CreateCategory from "../../components/AddProduct/CreateCategory";
import './userPage.scss';

const UserPage = () => {

    const {isAuth, email} = useAuth()
    const dispatch = useDispatch()
    const {data: categories} = useSelector((state) => state.category)

    console.log(categories, 'cat')

    return isAuth ? (
        <div className={'container'}>
            <div className={'welcome-title'}>
                <h1>Welcome {email}</h1>
                <button className={'logOut-btn'} onClick={() => dispatch(removeUser())}>
                    Log out
                </button>
            </div>
            <div className={'post-request'}>
                <div>
                    {
                        categories.map(el => (
                            <div key={el.id}>
                                <span>{el.id} - {el.name}</span>
                            </div>
                        ))
                    }
                </div>
                <CreateCategory/>
                <AddProduct/>
            </div>
        </div>
    ) : (
        <Navigate to={'/'}/>
    );
};

export default UserPage;