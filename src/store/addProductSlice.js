import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {BASE_URL} from "../utils/apiURL";
import {toast} from "react-toastify";


const fetchLocalStorage = () => {
    let cart = localStorage.getItem('myProducts');
    if (cart) {
        return JSON.parse(localStorage.getItem('myProducts'))
    } else {
        return []
    }
}

const storeInLocalStorage = (data) => {
    localStorage.setItem('myProducts', JSON.stringify(data))
}


const addProductSlice = createSlice({
    name: 'addProduct',
    initialState: {
        data: [],
        myProducts: fetchLocalStorage()
    },
    reducers: {
        setAddProduct(state, action) {
            state.data = action.payload
            storeInLocalStorage(state.data)
        }
    }
});

export const {setAddProduct} = addProductSlice.actions
export default addProductSlice.reducer

export const fetchAddProduct = (newProduct) => {
    newProduct.images = new Array(newProduct.images)
    return async function fetchAddProductThunk(dispatch) {
        try {
            await axios.post(`${BASE_URL}products`, newProduct)
                .then(({data}) => {
                    dispatch(setAddProduct(data))
                    toast.success('product added!')
                })

        } catch (e) {
            toast.error('product not added!!!')
            console.log(e)
        }
    }
}