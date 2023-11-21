import React, {useEffect} from 'react';
import AddProduct from "../../components/AddProduct/AddProduct";
import {useDispatch, useSelector} from "react-redux";
import CreateCategory from "../../components/AddProduct/CreateCategory";
import './userPage.scss';
import {getHandleUser} from "../../store/authSlice";
import {STATUS} from "../../utils/status";
import Error from "../../components/Error/Error";
import Loader from "../../components/Loader/Loader";

const UserPage = () => {

    const dispatch = useDispatch()

    const {data: categories} = useSelector((state) => state.category)

    const {user, status} = useSelector(state => state.auth)

    const accessToken = localStorage.getItem('u-access')

    useEffect(() => {
        dispatch(getHandleUser(accessToken))
    },[dispatch])


    if (status === STATUS.ERROR) return (<Error/>)
    if (status === STATUS.LOADING) return (<Loader/>)

    return (
        <div className={'container'}>
            <div className={'welcome-title'}>
                <h1>Welcome {user.name}</h1>
                <div className={'avatar'}>
                    <img src={user.avatar} alt=""/>
                </div>
            </div>
            <h1>Хотите создать свой продукт</h1>
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