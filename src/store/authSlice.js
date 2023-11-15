import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {toast} from "react-toastify";


const ACCESS_KEY = 'u-access'
const EMAIL_KEY = 'u-email'


const initialState = {
    user: [],
    access_token: localStorage.getItem(ACCESS_KEY) ?? '',
    email: localStorage.getItem(EMAIL_KEY) ?? '',
    isAuth: Boolean(localStorage.getItem(ACCESS_KEY))
}

const userSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        authRegister(state, action) {
            state.user = action.payload.user
        },
        authLogin(state, action) {
            state.email = action.payload.email
            state.access_token = action.payload.access_token
            state.isAuth = Boolean(action.payload.access_token)

            localStorage.setItem(ACCESS_KEY, action.payload.access_token)
            localStorage.setItem(EMAIL_KEY, action.payload.email)
        },
        authLogout(state) {
            state.email = null
            state.access_token = null
            state.isAuth = false

            localStorage.removeItem(ACCESS_KEY)
            localStorage.removeItem(EMAIL_KEY)
        },
    }
})

export const {authRegister, authLogin, authLogout} = userSlice.actions;

export default userSlice.reducer

export const register = (data) => {
    return async (dispatch) => {
        try {
            const response = await axios.post('https://api.escuelajs.co/api/v1/users/', data)
            dispatch(authRegister(response))
        } catch (e) {
            console.log(e, 'error')
        }
    }
}

export const login = (data) => {
    console.log(data, 'login data')
    return async (dispatch) => {
        try {
            const response = await axios.post('https://api.escuelajs.co/api/v1/auth/login', data)
            dispatch(authLogin({
                email: data.email,
                access_token: response.data.access_token
            }))
            toast.success('Успешно!')
        } catch (e) {
            console.log(e)
            toast.error('Неверный логин или пароль!')
        }
    }
}