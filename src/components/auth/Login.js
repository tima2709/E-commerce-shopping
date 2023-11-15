import React from 'react';
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup"
import * as yup from "yup"
import {useDispatch} from "react-redux";
import {login as authLogin} from "../../store/authSlice";
import {useNavigate} from "react-router-dom";


const schema = yup
    .object({
        email: yup.string().email('Не валидный email').required('Поле обязательно к заполнению'),
        password: yup.string().required('Поле обязательно к заполнению').min(4, 'Минимум 4 символов'),
    })
    .required()


const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm ({
        resolver: yupResolver(schema)
    })
    const onSubmit = (data) => {
        dispatch(authLogin({
            email: data.email,
            password: data.password,
        }))
        navigate('/user')
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)} className={'input-forms'}>
            <h2 className={'register'}>Login</h2>
            <div className={'inputs-register'}>
                <label>
                    Электронная почта
                    <input {...register("email", {
                        required: 'Поле обязательно к заполнению',
                        pattern: /^[A-Za-z]+$/i
                    })} />
                </label>
                <div>
                    {errors?.email && <p>{errors.email.message || "Ошибка"}</p>}
                </div>
            </div>
            <div className={'inputs-register'}>
                <label>
                    Пароль
                    <input type="password" {...register("password")} />
                </label>

                <p>{errors.password?.message}</p>
            </div>
            <button className={'auth-btn'} type={'submit'}>Вход</button>
        </form>
    );
};

export default Login;
