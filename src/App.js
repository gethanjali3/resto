import {useState, useContext} from 'react'
import {Route, Switch, BrowserRouter, Redirect} from 'react-router-dom'

import Cart from './components/Cart'
import Home from './components/Home'
import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

//write your code here
const App = () => {
  const [cartList, setCartList] = useState([])

  const removeAllCartItems = () => {
    setCartList([])
  }

  const removeCartItem = id => {
    const newItem = cartList.filter(each => id !== each.dishId)
    setCartList(newItem)
  }

  const addCartItem = item => {
    const already = cartList.find(each => each.dishId === item.dishId)
    if (already) {
      setCartList(prev =>
        prev.map(each => {
          if (each.dishId === item.dishId) {
            return {...each, count: each.count + 1}
          } else {
            return each
          }
        }),
      )
    } else {
      setCartList(prev => [...prev, item])
    }
  }

  const incrementCartItemQuantity = id => {
    setCartList(prev =>
      prev.map(each => {
        if (each.dishId === id) {
          return {...each, count: each.count + 1}
        } else {
          return each
        }
      }),
    )
  }

  const decrementCartItemQuantity = id => {
    setCartList(prev =>
      prev.map(each => {
        if (each.dishId === id) {
          if (each.count > 1) {
            return {...each, count: each.count - 1}
          } else {
            return {...each, count: 0}
          }
        } else {
          return each
        }
      }),
    )
  }

  return (
    <BrowserRouter>
      <CartContext.Provider
        value={{
          cartList,
          removeCartItem,
          decrementCartItemQuantity,
          incrementCartItemQuantity,
          addCartItem,
          removeAllCartItems,
        }}
      >
        <Switch>
          <ProtectedRoute exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Redirect to="/" />
        </Switch>
      </CartContext.Provider>
    </BrowserRouter>
  )
}

export default App
