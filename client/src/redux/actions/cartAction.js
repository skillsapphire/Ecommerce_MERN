import axios from 'axios'
import store from '../store'
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../types'

export const addToCart = (id, qty) => async (dispatch, getState) => {
    try {
        const { data } = await axios.get(`/api/v1/products/${id}`)
        const { _id, name, image, price, countInStock } = data
        dispatch(
            {
                type: CART_ADD_ITEM,
                payload: {
                    //! product to product_id
                    productId: _id,
                    name,
                    image,
                    price,
                    countInStock,
                    qty
                }
            })
        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))


    } catch (error) {

    }

}

export const removeFromCart = (id) => async (dispatch, getState) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id
    })
    localStorage.setItem('cartItems',
        JSON.stringify(getState().cart.cartItems))

}