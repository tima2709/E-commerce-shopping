import {configureStore} from "@reduxjs/toolkit";
import categoryReducer from './categorySlice';
import modalReducer from './modalSlice';
import productReducer from './productSlice';
import cartReducer from './cartSlice';
import searchReducer from "./searchSlice";
import filterReducer from "./filterSlice";
import addProductReducer from "./addProductSlice";
import authReducer from './authSlice';
import createCategoryReducer from './createCategorySlice';
import favoriteReducer from './favoriteSlice';


const store = configureStore({
    reducer: {
        category: categoryReducer,
        modal: modalReducer,
        product: productReducer,
        cart: cartReducer,
        search: searchReducer,
        filter: filterReducer,
        addProduct: addProductReducer,
        createCategory: createCategoryReducer,
        auth: authReducer,
        favorite: favoriteReducer,

    }
})

export default store;