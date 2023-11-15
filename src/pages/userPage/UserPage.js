import React from 'react';
import AddProduct from "../../components/AddProduct/AddProduct";
import {useDispatch, useSelector} from "react-redux";
import CreateCategory from "../../components/AddProduct/CreateCategory";
import './userPage.scss';
import {authLogout} from "../../store/authSlice";

const UserPage = () => {

    const dispatch = useDispatch()
    const {data: categories} = useSelector((state) => state.category)

    const handleLogout = () => {
        dispatch(authLogout())
    }

    return (
        <div className={'container'}>
            <div className={'welcome-title'}>
                <h1>Welcome </h1>
                <button onClick={handleLogout} className={'logOut-btn'}>
                    Log out
                </button>
            </div>
            <div className={'post-request'}>
                <div>
                    <h2>Категории товаров</h2>
                    <div>
                        {
                            categories.map(el => (
                                <div key={el.id}>
                                    <span>{el.id} - {el.name}</span>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <CreateCategory/>
                <AddProduct/>
            </div>
        </div>
    );
};

export default UserPage;