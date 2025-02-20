import React from 'react';


import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';

function Home() {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [categoryId, setCategoryId] = React.useState(0)
  const [currentPage, setCurrentPage] = React.useState(1)
  const [sortType, setSortType] = React.useState({
    name: "популярности ⬇", 
    sortProperty: "rating"
  });
  const {searchValue} = React.useContext(SearchContext);

  const pizzas = items.map(obj => <PizzaBlock key={obj.id} {...obj}/>)
  const bones = [...new Array(6)].map((_, index) =><Skeleton key={index}/>)

  React.useEffect(() => {
    setIsLoading(true);

    const sortBy = sortType.sortProperty.replace('-', '')
    const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
    const category =  categoryId > 0 ? `category=${categoryId}` : ''
    const search =  searchValue ? `&search=${searchValue}` : ''

    fetch(`https://67b3a70d392f4aa94fa7e9b9.mockapi.io/items?page=${currentPage}&limit=4&${ category }&sortBy=${sortBy}&order=${order}${search}`,)
      .then((res) => res.json())
      .then((json) => {
        setItems(json);
        setIsLoading(false)
      });
      window.scrollTo(0,0);
  }, [categoryId, sortType, searchValue, currentPage]);

  return(
    
    <div className="container">
      <div className="content__top">
          <Categories value={categoryId} onClickCategory={(i) => setCategoryId(i)} />
          <Sort value={sortType} onClickSort={(i) => setSortType(i)} />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
          {isLoading 
            ? bones
            : pizzas
          }
      </div>
      <Pagination onChangePage={(number) => setCurrentPage(number)}/>
    </div>
    
  )
}
export default Home