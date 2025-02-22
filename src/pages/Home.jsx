import React from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { setCategoryId } from '../redux/slices/filterSlice';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';

function Home() {
  const dispatch = useDispatch()
  const {categoryId, sort } = useSelector(state => state.filter)
  const sortType = sort.sortProperty;




  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState(1)
  const {searchValue} = React.useContext(SearchContext);

  const pizzas = items.map(obj => <PizzaBlock key={obj.id} {...obj}/>)
  const bones = [...new Array(6)].map((_, index) =><Skeleton key={index}/>)


  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id))
  }

  React.useEffect(() => {
    setIsLoading(true);

    const sortBy = sortType.replace('-', '')
    const order = sortType.includes('-') ? 'asc' : 'desc';
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
          <Categories value={categoryId} onClickCategory={(i) => onChangeCategory(i)} />
          <Sort  />
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