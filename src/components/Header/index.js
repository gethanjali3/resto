import {useState, useEffect, useContext} from 'react'
import {Link} from 'react-router-dom'

import CartContext from '../../context/CartContext'

const Header = () => {
    const [name, setname] = useState('')
    const {cartList} = useContext(CartContext)
    const getResults = async() => {
        const response = await fetch(
      'https://run.mocky.io/v3/77a7e71b-804a-4fbd-822c-3e365d3482cc',
    )
    const data = await response.json()
    if (response.ok) {
        setname(data[0].restaurant_name)
    }
    }

    return (
        <div>
        <Link to='/home'><h1>{name}</h1></Link>
        <Link to='/cart'><button type='button'>c</button></Link>
        <p>{cartList.length}</p>
        <Link to='/login'><button type='button'>Logout</button></Link>
        </div>
    )
}

export default Header