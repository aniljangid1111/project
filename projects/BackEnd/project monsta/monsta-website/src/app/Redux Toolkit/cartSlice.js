import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';


// SSR safe initial state
const initialState = {
    cartItems: [], // initially empty
    subtotal: 0,
};

// Slice
export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCart: (state, action) => {
            // Ensure payload is object with cartItems & subtotal
            const { cartItems = [], subtotal = 0 } = action.payload || {};
            state.cartItems = Array.isArray(cartItems) ? cartItems : [];
            state.subtotal = subtotal;

            if (typeof window !== 'undefined') {
                Cookies.set("cartItems", JSON.stringify(state.cartItems));
            }
        }


    },
});

export const { setCart } = cartSlice.actions;

// Thunks
export const fetchCart = (user_id) => async (dispatch) => {
    try {
        const { data } = await axios.post(`http://localhost:8001/api/website/cart/view/${user_id}`);
        if (data._status) {
            const items = Array.isArray(data._data.items) ? data._data.items.map(item => ({
                id: item.product_id._id,
                name: item.product_id.name,
                image: data._image_path + item.product_id.image,
                qty: item.quantity,
                price: item.price,
            })) : [];

            dispatch(setCart({
                cartItems: items,
                subtotal: data._data.sub_total || 0
            }));
        }
    } catch (err) {
        console.error(err);
        dispatch(setCart({ cartItems: [], subtotal: 0 }));
    }
};



export const addCartItem = (user_id, product) => async (dispatch) => {
    try {
        // API call first
        const { data } = await axios.post('http://localhost:8001/api/website/cart/add', {
            user_id,
            product_id: product._id,
            quantity: 1,
        });

        if (data._status) {
            const items = Array.isArray(data._data.items) ? data._data.items.map(item => ({
                id: item.product_id._id,
                name: item.product_id.name,
                image: data._image_path + item.product_id.image,
                qty: item.quantity,
                price: item.price,
            })) : [];

            dispatch(setCart({
                cartItems: items,
                subtotal: data._data.sub_total || 0
            }));

            toast.success('Cart updated!');
        } else {
            toast.error(data._message || "Something went wrong!");
        }

    } catch (err) {
        console.error(err);
        toast.error('Something went wrong while adding to cart!');
    }
};

// cartSlice.js
export const removeCartItem = (user_id, product_id) => async (dispatch) => {
    try {
        const { data } = await axios.post('http://localhost:8001/api/website/cart/remove', {
            user_id,
            product_id
        });

        if (data._status) {
            const items = Array.isArray(data._data.items) ? data._data.items.map(item => ({
                id: item.product_id._id,
                name: item.product_id.name,
                image: `${data._image_path ?? ''}${item.product_id.image ?? ''}`,
                qty: item.quantity,
                price: item.price
            })) : [];

            dispatch(setCart({
                cartItems: items,
                subtotal: data._data.sub_total || 0
            }));
        }
    } catch (err) {
        console.error(err);
    }
};



// Optional: Load cart from localStorage on browser
export const loadCartFromStorage = () => (dispatch) => {
    if (typeof window !== 'undefined') {
        const savedCart = Cookies.get("cartItems");
        const cart = savedCart ? JSON.parse(savedCart) : [];
        dispatch(setCart(cart));
    }
};

export default cartSlice.reducer;