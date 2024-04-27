import {useState, useEffect} from 'react'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import DishItem from '../DishItem'

const Home = () => {
  const [result, setresult] = useState([])
  const [loading, setloading] = useState(true)
  const [activetab, setactivetab] = useState('')

  const getResult = async () => {
    const response = await fetch(
      'https://run.mocky.io/v3/77a7e71b-804a-4fbd-822c-3e365d3482cc',
    )
    const data = await response.json()
    if (response.ok) {
      setloading(false)
      const updatedData = data[0].table_menu_list.map(each => ({
        menuCategory: each.menu_category,
        menuCategoryId: each.menu_category_id,
        menuCategoryImage: each.menu_category_image,
        categoryDishes: each.category_dishes.map(item => ({
          dishId: item.dish_id,
          dishName: item.dish_name,
          dishPrice: item.dish_price,
          dishImage: item.dish_image,
          dishCurrency: item.dish_currency,
          dishCalories: item.dish_calories,
          dishDescription: item.dish_description,
          dishAvailability: item.dish_Availability,
          dishType: item.dish_Type,
          addonCat: item.addonCat,
        })),
      }))
      setresult(updatedData)
      setactivetab(data[0].table_menu_list[0].menuCategoryId)
    }
  }

  useEffect(() => {
    getResult()
  }, [])

  const tablistfunction = event => {
    setactivetab(event.target.id)
  }

  const loaderfunction = () => (
    <div>
      <Loader size={10} />
    </div>
  )

  const tabfunction = () => (
    <ul>
      {result.map(each => (
        <li key={each.menuCategoryId} id={each.menuCategoryId}>
          <button type="button" onClick={tablistfunction}>
            {each.menuCategory}
          </button>
        </li>
      ))}
    </ul>
  )

  const dishlistfunction = () => {
    const newlist = result.find(each => activetab === each.menuCategoryId)
    return (
      <div>
        <ul>
          {newlist.categoryDishes.map(items => (
            <DishItem key={items.dishId} details={items} />
          ))}
        </ul>
      </div>
    )
  }

  return (
    <div>
      <Header />
      {tabfunction()}
      {loading ? loaderfunction() : dishlistfunction()}
    </div>
  )
}

export default Home
