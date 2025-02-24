import React from 'react';
import qs from 'qs'
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import {sortList} from '../components/Sort';


import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import { SearchContext } from '../App';

function Home() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isSearch = React.useRef(false)
  const isMounted = React.useRef(false)

  const {categoryId, sort, currentPage } = useSelector(state => state.filter)
  const sortType = sort.sortProperty;

  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const {searchValue} = React.useContext(SearchContext);

  const pizzas = items.map(obj => <PizzaBlock key={obj.id} {...obj}/>)
  const bones = [...new Array(6)].map((_, index) =><Skeleton key={index}/>)


  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id))
  }

  const onChangePage = number => {
    dispatch(setCurrentPage(number));
  }

  const fetchPizzas = () => {
    setIsLoading(true);

    const sortBy = sortType.replace('-', '')
    const order = sortType.includes('-') ? 'asc' : 'desc';
    const category =  categoryId > 0 ? `category=${categoryId}` : ''
    const search =  searchValue ? `&search=${searchValue}` : ''

      axios
        .get(`https://67b3a70d392f4aa94fa7e9b9.mockapi.io/items?page=${currentPage}&limit=4&${ category }&sortBy=${sortBy}&order=${order}${search}`)
        .then((res) => {
          setItems(res.data);
          setIsLoading(false)
        })
  }

  // Если был первый рендер, то проверяем URL-параметры и сохраняем в редуксе
  React.useEffect(() => {
    if (window.location.search){
      const params = qs.parse(window.location.search.substring(1));

      const sort = sortList.find(obj => obj.sortProperty === params.sortProperty)

      dispatch(
        setFilters({
          ...params,
          sort,
        })
      );
      isSearch.current = true;
    }
  }, []);

  // Если изменили параметры и был первый рендер
  React.useEffect(() => {
    if(isMounted.current){
      const queryString = qs.stringify({
        sortProperty: sortType,
        categoryId,
        currentPage,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
    
  }, [categoryId, sortType, currentPage]);
  
  // Если был первый рендер, то запрашиваем пиццы
  React.useEffect(() => {
    window.scrollTo(0,0);

    if(!isSearch.current){
      fetchPizzas();
    }
    isSearch.current = false;
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
      <Pagination currentPage={currentPage} onChangePage={onChangePage}/>
    </div>
    
  )
}
export default Home