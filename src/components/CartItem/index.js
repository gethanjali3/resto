import {useState, useContext} from 'react'

import CartContext from '../../context/CartContext'

const CartItem = props => {
    const {removeCartItem, incrementCartItemQuantity, decrementCartItemQuantity} = useContext(CartContext)
    const {detail} = props
    const {count, dishName, dishPrice, dishImage, dishId} = detail

    const remove = () =>{
        removeCartItem(dishId)
    }

    const increase = () =>{
        incrementCartItemQuantity(dishId)
    }

    const decrease = () =>{
        decrementCartItemQuantity(dishId)
    }

    return (
        <div>
            <p>{dishName}</p>
            <p>{dishPrice}</p>
            <img src={dishImage} alt={dishName}/>
            <button type='button' onClick={decrease}>-</button>
            <p>{dishPrice}</p>
            <button type='button' onClick={increase}>+</button>
            <button type='button' onClick={remove}>Remove</button>
        </div>
    )

}

export default CartItem