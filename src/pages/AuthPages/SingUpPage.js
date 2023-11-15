import React from 'react';
import {Link} from "react-router-dom";
import SingUp from "../../components/auth/SingUp";

const RegisterPage = () => {
    return (
        <div className={'container'}>
            <h1 style={{textAlign: 'center'}}>Register</h1>
            <SingUp/>
            <p style={{textAlign: 'center', margin: '30px'}}>already have an account <Link className={'login-btn2'} to={'/login'}>Sing In</Link></p>
        </div>
    );
};

export default RegisterPage;