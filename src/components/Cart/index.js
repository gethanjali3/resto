import {useState, useContext} from 'react'

import CartItem from '../CartItem'
import CartContext from '../../context/CartContext'

const Cart = () => {
  const {removeAllCartItems, cartList} = useContext(CartContext)

  const empty = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
        alt="vbv"
      />
    </div>
  )

  const listview = () => (
    <ul>
      {cartList.map(each => (
        <CartItem key={each.dishId} detail={each} />
      ))}
    </ul>
  )
  return (
    <div>
      <button type="button" onClick={removeAllCartItems}>
        Remove All
      </button>
      {cartList.length !== 0 ? listview() : empty()}
    </div>
  )
}

export default Cart
