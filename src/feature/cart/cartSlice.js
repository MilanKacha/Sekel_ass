import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const calculateTotal = (cartItems) => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
};

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems: JSON.parse(localStorage.getItem('cart')) || [],
        totalAmount: JSON.parse(localStorage.getItem('totalAmount')) || 0,
    },
    reducers: {
        addToCart: (state, action) => {
            const existingProduct = state.cartItems.find(item => item.id === action.payload.id);
            if (existingProduct) {
                existingProduct.quantity += 1;
                toast.info(`${action.payload.title} quantity increased!`);
            } else {
                state.cartItems.push({ ...action.payload, quantity: 1 });
                toast.success(`${action.payload.title} added to cart!`);
            }
            state.totalAmount = calculateTotal(state.cartItems);
            localStorage.setItem('cart', JSON.stringify(state.cartItems)); 
            localStorage.setItem('totalAmount', JSON.stringify(state.totalAmount));
             
        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter(item => item.id !== action.payload.id);
            state.totalAmount = calculateTotal(state.cartItems);
            localStorage.setItem('cart', JSON.stringify(state.cartItems));
            localStorage.setItem('totalAmount', JSON.stringify(state.totalAmount));
            toast.error(`${action.payload.title} removed from cart!`);
        },
        clearCart: (state) => {
            state.cartItems = [];
            state.totalAmount = 0;
            localStorage.removeItem('cart');
            localStorage.removeItem('totalAmount');
            toast.warn('Cart cleared!');
        },
    },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
