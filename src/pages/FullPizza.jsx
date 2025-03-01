import React from 'react'
import axios from 'axios'
import { useParams } from 'react-router'

const FullPizza = () => {
  const {id} = useParams()
  const [pizzaData, setPizzaData] = React.useState(); 

  React.useEffect(() => {
    async function fetchPizzaData(){
      try {
        const {data} = await axios.get(`https://67b3a70d392f4aa94fa7e9b9.mockapi.io/items/${id}`)
        setPizzaData(data)
      } catch (error) {
        alert('Ошибка при получении пиццы')
      }
    }
    fetchPizzaData()
  }, []);
  if(!pizzaData ){
    return  <h2>Загрузка...</h2>
  } 
  return (
    <div className="container">
      <img src={pizzaData.imageUrl} alt="Pizza" />
      <h2>{pizzaData.title}</h2>
      <h4>{pizzaData.price} ₽</h4>
    </div>
  )
}

export default FullPizza
