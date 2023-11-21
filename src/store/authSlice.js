import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {toast} from "react-toastify";
import {STATUS} from "../utils/status";


const ACCESS_KEY = 'u-access'
const EMAIL_KEY = 'u-email'



const initialState = {
    user: {},
    access_token: localStorage.getItem(ACCESS_KEY) ?? '',
    email: localStorage.getItem(EMAIL_KEY) ?? '',
    isAuth: Boolean(localStorage.getItem(ACCESS_KEY)),
    status: STATUS.IDLE
}

const userSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        authRegister(state, action) {
            state = action.payload
        },
        authLogin(state, action) {
            state.email = action.payload.email
            state.access_token = action.payload.access_token
            state.isAuth = Boolean(action.payload.access_token)

            localStorage.setItem(ACCESS_KEY, action.payload.access_token)
            localStorage.setItem(EMAIL_KEY, action.payload.email)
        },
        getUser(state, action) {
            state.user = action.payload
        },
        authLogout(state) {
            state.email = null
            state.access_token = null
            state.isAuth = false

            localStorage.removeItem(ACCESS_KEY)
            localStorage.removeItem(EMAIL_KEY)
        },

        setStatus(state, action) {
            state.status = action.payload
        }
    }
})

export const {getUser, authRegister, authLogin, authLogout, setStatus} = userSlice.actions;

export default userSlice.reducer

export const register = (data) => {
    return async (dispatch) => {
        dispatch(setStatus(STATUS.LOADING))
        try {
            const response = await axios.post('https://api.escuelajs.co/api/v1/users/', data)
            dispatch(authRegister(response.data))
            dispatch(setStatus(STATUS.IDLE))
            toast.success('Успешно зарегистрировались')
        } catch (e) {
            dispatch(setStatus(STATUS.ERROR))
            console.log(e, 'error')
        }
    }
}

export const login = (data) => {
    return async (dispatch) => {
        dispatch(setStatus(STATUS.LOADING))
        try {
            const response = await axios.post('https://api.escuelajs.co/api/v1/auth/login', data)
            dispatch(authLogin({
                email: data.email,
                access_token: response.data.access_token
            }))
            dispatch(setStatus(STATUS.IDLE))
            toast.success('Успешно!')
        } catch (e) {
            dispatch(setStatus(STATUS.ERROR))
            console.log(e)
            toast.error('Неверный логин или пароль!')
        }
    }
}

export const getHandleUser = (accessToken) => {
    return async (dispatch) => {
        dispatch(setStatus(STATUS.LOADING))
        try {
            const response = await axios.get('https://api.escuelajs.co/api/v1/auth/profile', {
                headers: {
                    'Authorization' : `Bearer ${accessToken}`
                }
            })
            dispatch(getUser(response.data))
            dispatch(setStatus(STATUS.IDLE))
        } catch (e) {
            dispatch(setStatus(STATUS.ERROR))
            console.log(e)
        }
    }
}