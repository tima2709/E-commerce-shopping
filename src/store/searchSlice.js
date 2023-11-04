import {createSlice} from "@reduxjs/toolkit";
import {STATUS} from "../utils/status";
import {BASE_URL} from "../utils/apiURL";
import axios from "axios";



const searchSlice = createSlice({
    name: 'search',
    initialState: {
        search: [],
        status: STATUS.IDLE
    },
    reducers: {
        setSearchProducts(state, action) {
            state.search = action.payload
        },
        setStatus(state, action) {
            state.status = action.payload
        }
    }
});

export const {setSearchProducts, setStatus} = searchSlice.actions
export default searchSlice.reducer

export const axiosSearchProducts = (searchedItem) => {
    return async function axiosSearchProductsThunk(dispatch) {
        dispatch(setStatus(STATUS.LOADING));
        try {
            await axios(`${BASE_URL}products/?title=${searchedItem}`)
                .then(({data}) => {
                    dispatch(setSearchProducts(data));
                    dispatch(setStatus(STATUS.IDLE))
                })
        } catch (error) {
            dispatch(setStatus(STATUS.ERROR))
        }
    }
}