import React from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';


function Home() {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  
  React.useEffect(() => {
    fetch('https://67b3a70d392f4aa94fa7e9b9.mockapi.io/items')
      .then((res) => res.json())
      .then((json) => {
        setItems(json);
        setIsLoading(false)
      });
      window.scrollTo(0,0);
  }, []);

  return(
    
    <div className="container">
      <div className="content__top">
          <Categories />
          <Sort />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
          {isLoading 
            ? [...new Array(6)].map((_, index) =><Skeleton key={index}/>) 
            : items.map(obj => <PizzaBlock key={obj.id} {...obj} />)
          }
      </div>
    </div>
  )
}
export default Home