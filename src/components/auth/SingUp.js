import React from 'react';
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth";
import {useNavigate} from "react-router-dom";
import {Form} from "./authForm";
import {useDispatch} from "react-redux";
import {setUser} from "../../store/authSlice";
import {toast} from "react-toastify";


const SingUp = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleRegister = (email, password) => {
        const auth = getAuth();
        console.log(auth, 'auth')
        createUserWithEmailAndPassword(auth, email, password)
            .then(({user}) => {
                toast.success('Success sign up')
                dispatch(setUser({
                    email: user.email,
                    id: user.uid,
                    token: user.accessToken,
                }));
                navigate('/')
            })
            .catch(console.error)
    }
    return (
        <Form
            title={"register"}
            handleClick={handleRegister}
        />
    );
};

export {SingUp};