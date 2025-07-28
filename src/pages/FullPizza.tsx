import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router';

const FullPizza: React.FC = () => {
  const { id } = useParams();
  const [pizzaData, setPizzaData] = React.useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();

  React.useEffect(() => {
    async function fetchPizzaData() {
      try {
        const { data } = await axios.get(`https://ff28541722520873.mokky.dev/items/${id}`);
        setPizzaData(data);
      } catch (error) {
        alert('Ошибка при получении пиццы');
      }
    }
    fetchPizzaData();
  }, []);

  if (!pizzaData) {
    return <h2>Загрузка...</h2>;
  }

  return (
    <div className="container">
      <img src={pizzaData.imageUrl} alt="Pizza" />
      <h2>{pizzaData.title}</h2>
      <h4>{pizzaData.price} ₽</h4>
    </div>
  );
};

export default FullPizza;
