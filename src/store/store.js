import {configureStore} from "@reduxjs/toolkit";
import categoryReducer from './categorySlice';
import modalReducer from './modalSlice';
import productReducer from './productSlice';
import cartReducer from './cartSlice';
import searchReducer from "./searchSlice";
import filterReducer from "./filterSlice";

const store = configureStore({
    reducer: {
        category: categoryReducer,
        modal: modalReducer,
        product: productReducer,
        cart: cartReducer,
        search: searchReducer,
        filter: filterReducer,
    }
})

export default store;