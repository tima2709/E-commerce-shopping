import React from 'react';
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup"
import * as yup from "yup"
import {useDispatch, useSelector} from "react-redux";
import {register as authRegister} from "../../store/authSlice";
import './auth.scss';
import {useNavigate} from "react-router-dom";
import {STATUS} from "../../utils/status";
import Error from "../Error/Error";
import Loader from "../Loader/Loader";


const schema = yup
    .object({
        name: yup.string().required('Поле обязательно к заполнению'),
        email: yup.string().email('Не валидный email').required('Поле обязательно к заполнению'),
        role: yup.string(),
        avatar: yup.string(),
        password: yup.string().required('Поле обязательно к заполнению').min(4, 'Минимум 4 символов'),
        password1: yup.string().required('Поле обязательно к заполнению').min(4, 'Минимум 4 символов').oneOf([yup.ref('password')], 'Пароли должны совпадать'),
    })
    .required()


const SingUp = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {status} = useSelector(state => state.auth)

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm ({
        resolver: yupResolver(schema)
    })
    const onSubmit = (data) => {
        dispatch(authRegister({
            email: data.email,
            name: data.name,
            password: data.password,
            role: data.role,
            avatar: data.avatar,
        }))
        navigate('/login')
    }

    if (status === STATUS.ERROR) return (<Error/>)
    if (status === STATUS.LOADING) return (<Loader/>)


    return (
        <form onSubmit={handleSubmit(onSubmit)} className={'input-forms'}>
            <h2 className={'register'}>Регистрация</h2>
            <div className={'inputs-register'}>
                <label>
                    Имя
                    <input
                        {...register("name", )}
                    />
                </label>
                <div>
                    {errors?.name && <p>{errors.name.message || "Ошибка"}</p>}
                </div>
            </div>
            <div className={'inputs-register'}>
                <label htmlFor="">
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
                    Роль
                    {/*<input {...register("role")}/>*/}
                    <select name="role" {...register("role")} >
                        <option value="admin">Админ</option>
                        <option value="customer">Клиент</option>
                    </select>
                </label>
                <div>
                    {errors?.role && <p>{errors.role.message || "Ошибка"}</p>}
                </div>
            </div>
            <div className={'inputs-register'}>
                <label>
                    Картинка
                    <input {...register("avatar")}/>
                </label>
                <div>
                    {errors?.avatar && <p>{errors.avatar.message || "Ошибка"}</p>}
                </div>
            </div>
            <div className={'inputs-register'}>
                <label>
                    Пароль
                    <input type="password" {...register("password", {
                        required: 'Поле обязательно к заполнению',
                        minLength: {
                            value: 8,
                            message: 'Минимум 8 символов'
                        }
                    })} />
                </label>

                <p>{errors.password?.message}</p>
            </div>
            <div className={'inputs-register'}>
                <label htmlFor="">
                    Подтвердите пароль
                    <input type="password" {...register("password1", {
                        required: 'Поле обязательно к заполнению',
                        minLength: {
                            value: 8,
                            message: 'Минимум 8 символов'
                        }
                    })} />
                </label>
                {errors?.password1 && <p>{errors.password1.message || "Пароли не совподают"}</p>}
            </div>
            <button className={'auth-btn'} type={'submit'}>Зарегистрироваться</button>
        </form>
    );
};

export default SingUp;
