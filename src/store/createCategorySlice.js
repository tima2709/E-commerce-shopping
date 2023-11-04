import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {BASE_URL} from "../utils/apiURL";
import {toast} from "react-toastify";


const createCategorySlice = createSlice({
    name: 'createCategory',
    initialState: {
        data: []
    },
    reducers: {
        setCreateCategory(state, action) {
            state.data = action.payload
        }
    }
});

export const {setCreateCategory} = createCategorySlice.actions
export default createCategorySlice.reducer

export const fetchCreateCategory = (newCategory) => {
    return async function fetchCreateCategoryThunk(dispatch) {
        try {
            await axios.post(`${BASE_URL}categories/`, newCategory)
                .then(({data}) => {
                    dispatch(setCreateCategory(data))
                    toast.success('Category created!')
                })

        } catch (e) {
            toast.error('Category does not created!!!')
            console.log(e)
        }
    }
}