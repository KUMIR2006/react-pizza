import React from 'react';
import qs from 'qs'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import {sortList} from '../components/Sort';

import { fetchPizzas, selectPizzaData, selectFilter } from '../redux/slices/pizzasSlice';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import { SearchContext } from '../App';

function Home() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isSearch = React.useRef(false)
  const isMounted = React.useRef(false)

  const {categoryId, sort, currentPage, searchValue } = useSelector(selectFilter)
  const sortType = sort.sortProperty;
  const { items, status } = useSelector(selectPizzaData)

  const pizzas = items.map(obj => <PizzaBlock key={obj.id} {...obj}/>)
  const bones = [...new Array(6)].map((_, index) =><Skeleton key={index}/>)


  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id))
  }

  const onChangePage = number => {
    dispatch(setCurrentPage(number));
  }

  const getPizzas = async () => {

    const sortBy = sortType.replace('-', '')
    const order = sortType.includes('-') ? 'asc' : 'desc';
    const category =  categoryId > 0 ? `category=${categoryId}` : ''
    const search =  searchValue ? `&search=${searchValue}` : ''


    dispatch(fetchPizzas({
      sortBy,
      order,
      category,
      search,
      currentPage,
    }))
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
      getPizzas();
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
        {
          status === 'error' ? 
          (<div className="content__error-info">
            <h2>Произошла ошибка</h2>
            <p>К сожалению, не удалось получить пиццы. Попробуйте повторить попытку позже</p>
          </div>) 
          : 
          (<div className="content__items">
            {status === 'loading'
              ? bones
              : pizzas
            }
          </div>)
        }
        
      <Pagination currentPage={currentPage} onChangePage={onChangePage}/>
    </div>
    
  )
}
export default Home