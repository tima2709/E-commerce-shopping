import {createSlice} from "@reduxjs/toolkit";
import {toast} from "react-toastify";

const fetchLocalStorage = () => {
    let cart = localStorage.getItem('cart');
    if (cart) {
        return JSON.parse(localStorage.getItem('cart'))
    } else {
        return []
    }
}

const storeInLocalStorage = (data) => {
    localStorage.setItem('cart', JSON.stringify(data))
}


const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        data: fetchLocalStorage(),
        totalItems: 0,
        totalAmount: 0,
        deliveryCharge: 1000
    },


    reducers: {
        addToCart(state, action) {
            const tempItem = state.data.find(item => item.id === action.payload.id);
            if (tempItem) {
                const tempCart = state.data.map(item => {
                    if (item.id === action.payload.id) {
                        let newQty = item.quantity + action.payload.quantity;
                        let newTotalPrice = newQty * item.price;
                        return {
                            ...item, quantity: newQty, totalPrice: newTotalPrice
                        }
                    } else {
                        return item
                    }
                });
                state.data = tempCart;
                storeInLocalStorage(state.data)
            } else {
                state.data.push(action.payload);
                storeInLocalStorage(state.data)
                toast.success('product added to the cart!')
            }
        },
        removeFromCart(state, action) {
            const tempCart = state.data.filter(item => item.id !== action.payload);
            state.data = tempCart;
            storeInLocalStorage(state.data)
            toast.success('product removed from the cart!')
        },
        clearCart(state) {
            state.data = [];
            storeInLocalStorage(state.data)
            toast.success('cart is clear!')
        },
        getCartTotal(state) {
            state.totalAmount = state.data.reduce((cartTotal, cartItem) => {
                return cartTotal += cartItem.totalPrice;
            }, 0);
            state.totalItems = state.data.length;
        },
        toggleCartQty(state, action) {
            const tempCart = state.data.map(item => {
                if(item.id === action.payload.id) {
                    let tempQty = item.quantity;
                    let tempTotalPrice = item.totalPrice;
                    if(action.payload.type === "INC") {
                        tempQty++;
                        tempTotalPrice = tempQty * item.price;
                    }

                    if (action.payload.type === "DEC") {
                        tempQty--;
                        if (tempQty < 1) tempQty = 1;
                        tempTotalPrice = tempQty * item.price
                    }
                    return {...item, quantity: tempQty, totalPrice: tempTotalPrice}
                } else {
                     return item
                }
            });
            state.data = tempCart;
            storeInLocalStorage(state.data)
        }
    }
})

export const {addToCart, removeFromCart, getCartTotal, clearCart, toggleCartQty} = cartSlice.actions

export default cartSlice.reducer
