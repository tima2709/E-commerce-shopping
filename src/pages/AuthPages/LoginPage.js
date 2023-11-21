import React from 'react';
import {Link} from "react-router-dom";
import Login from "../../components/auth/Login";
import './authPage.scss';
import {useSelector} from "react-redux";

const LoginPage = () => {

    // const {isAuth} = useSelector(state => state.auth)

    return (
        <div className={'container'}>
            <h1 style={{textAlign: 'center'}}>Login</h1>
            <Login/>
            <p style={{textAlign: 'center', margin: '30px'}}>Или <Link className={'register-btn2'} to={'/register'}>Регистрация</Link></p>
        </div>
    );
};

export default LoginPage;