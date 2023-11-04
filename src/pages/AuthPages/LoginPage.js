import React from 'react';
import {Link} from "react-router-dom";
import {Login} from "../../components/auth/Login";
import './authPage.scss';

const LoginPage = () => {
    return (
        <div className={'container'}>
            <h1 style={{textAlign: 'center'}}>Login</h1>
            <Login/>
            <p style={{textAlign: 'center', margin: '30px'}}>Or <Link className={'register-btn2'} to={'/register'}>register</Link></p>
        </div>
    );
};

export default LoginPage;