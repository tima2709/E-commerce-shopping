import {createSlice} from "@reduxjs/toolkit";
import {STATUS} from "../utils/status";
import axios from "axios";
import {BASE_URL} from "../utils/apiURL";


const filterSlice = createSlice({
    name: 'filter',
    initialState: {
        filteredProducts: [],
        status: STATUS.IDLE
    },
    reducers: {
        setFilteredProducts(state, action) {
            state.filteredProducts = action.payload
        },
        setStatus(state, action) {
            state.status = action.payload
        }
    }
});

export const {setFilteredProducts, setStatus} = filterSlice.actions;
export default filterSlice.reducer;

export const axiosFilter = (title, minPrice, maxPrice, categoryID) => {
    return async function axiosFilteredProducts(dispatch) {
        dispatch(setStatus(STATUS.LOADING));
        try {
            await axios(`${BASE_URL}products/?title=${title}&price_min=${minPrice}&price_max=${maxPrice}&categoryId=${categoryID}`)
                .then(({data}) => {
                    dispatch(setFilteredProducts(data))
                    dispatch(setStatus(STATUS.IDLE))
                })
        } catch (error) {
            dispatch(setStatus(STATUS.ERROR))
        }
    }
}