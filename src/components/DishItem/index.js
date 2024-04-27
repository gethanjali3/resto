import {useState, useContext} from 'react'

import CartContext from '../../context/CartContext'

const DishItem = props => {
  const [count, setcount] = useState(0)
  const {addCartItem, cartList} = useContext(CartContext)
  const {details} = props
  const {
    dishId,
    dishName,
    dishPrice,
    dishImage,
    dishCurrency,
    dishCalories,
    dishDescription,
    dishAvailability,
    dishType,
    addonCat,
  } = details

  const decreasefunction = () => {
      if (count > 1) {
        setcount(prev => prev - 1)
      } else {
          setcount(0)
      }
  }
  
  const increasefunction = () => {
    setcount(prev => prev + 1)
  }

  const addfunction = () => {
    addCartItem({...details, count})
  }

  return (
    <li>
      <h1>{dishName}</h1>
      <p>{dishCurrency}</p>
      <p>{dishPrice}</p>
      <p>{dishDescription}</p>
      {dishAvailability ? (
        <div>
          <button type="button" onClick={decreasefunction}>
            -
          </button>
          <p>{count}</p>
          <button type="button" onClick={increasefunction}>
            +
          </button>
        </div>
      ) : (
        <p>Not available</p>
      )}
      {addonCat.length !== 0 && <p>Customizations available</p>}
      <p>{dishCalories}</p>
      <img src={dishImage} alt={dishName} />
      <button type="button" onClick={addfunction}>
        ADD TO CART
      </button>
    </li>
  )
}

export default DishItem
