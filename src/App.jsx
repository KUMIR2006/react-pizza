import React from 'react';

import Header from './components/Header';
import Categories from './components/Categories';
import Sort from './components/Sort';
import PizzaBlock from './components/PizzaBlock';
import axios from 'axios';

import './scss/app.scss';

function App() {
  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    fetch('https://67b3a70d392f4aa94fa7e9b9.mockapi.io/items')
      .then((res) => res.json())
      .then((json) => {
        setItems(json);
      });
  }, []);


//   React.useEffect(() =>
//     {
//       async function fetchData() {
//         try {
//           axios.get('https://67b3a70d392f4aa94fa7e9b9.mockapi.io/items')
//           .then((data) => {setItems(data)});
//         }
//         catch (error) {alert("Ошибка при запросе данных :(")}
//       }
//       fetchData();
// }, []);
  return (
    <div>
      <div className="wrapper">
        <Header />
        <div className="content">
          <div className="container">
            <div className="content__top">
              <Categories />
              <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
              {items.map((obj) => (
                <PizzaBlock key={obj.id} {...obj} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
