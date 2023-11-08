import {createSlice} from "@reduxjs/toolkit";
import {toast} from "react-toastify";


const fetchLocalStorage = () => {
    let cart = localStorage.getItem('favorite');
    if (cart) {
        return JSON.parse(localStorage.getItem('favorite'))
    } else {
        return []
    }
}

const storeInLocalStorage = (data) => {
    localStorage.setItem('favorite', JSON.stringify(data))
}

const favoriteSlice = createSlice({
    name: 'favorite',
    initialState: {
        data: fetchLocalStorage()
    },

    reducers: {
        addToFavorite(state, action) {
            // console.log(action.payload, 'action')
            const tempItem = state.data.find(item => item.id === action.payload.id)
            if(tempItem) {
                const tempFav = state.data.filter(item => item.id !== action.payload.id)
                toast.success('product removed to the favorite!')
                state.data = tempFav
                storeInLocalStorage(state.data)
            } else {
                state.data.push(action.payload)
                storeInLocalStorage(state.data)
                toast.success('product added to the favorite!')
            }
        }
    }
})

export const {addToFavorite} = favoriteSlice.actions

export default favoriteSlice.reducer