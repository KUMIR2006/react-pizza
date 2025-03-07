import React from 'react';
import { useSelector } from 'react-redux';

import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';


import { useAppDispatch } from '../redux/store';
import { selectFilter, selectPizzaData } from '../redux/pizza/selectors';
import { setCategoryId, setCurrentPage } from '../redux/filter/slice';
import { fetchPizzas } from '../redux/pizza/asyncActions';


const Home: React.FC = () => {
  const dispatch = useAppDispatch()
  const {categoryId, sort, currentPage, searchValue } = useSelector(selectFilter)
  const sortType = sort.sortProperty;
  const { items, status } = useSelector(selectPizzaData)

  const pizzas = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj}/>)
  const bones = [...new Array(6)].map((_, index) =><Skeleton key={index}/>)


  const onChangeCategory = React.useCallback((id: number) => {
    dispatch(setCategoryId(id))
  }, [])

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  }


  const getPizzas = async () => {

    const sortBy = sortType.replace('-', '')
    const order = sortType.includes('-') ? 'asc' : 'desc';
    const category =  categoryId > 0 ? `category=${categoryId}` : ''
    const search =  searchValue ? `&search=${searchValue}` : ''


    dispatch(
      fetchPizzas({
      sortBy,
      order,
      category,
      search,
      currentPage: String(currentPage),
    }))
}
  // Если изменили параметры и был первый рендер
  // React.useEffect(() => {
  //   if(isMounted.current){
  //     const params ={
  //       categoryId: categoryId > 0 ? categoryId : null,
  //       sortProperty: sortType,
  //       currentPage,
  //     }
  //     const queryString = qs.stringify(params, { skipNulls: true });

  //     navigate(`/?${queryString}`);
  //   }

  //   if (!window.location.search) {
  //     dispatch(fetchPizzas({} as SearchPizzaParams));
  //   }
  //   isMounted.current = true;
    
  // }, [categoryId, sortType, searchValue, currentPage]);
  

  // // Если был первый рендер, то проверяем URL-параметры и сохраняем в редуксе
  // React.useEffect(() => {
  //   if (window.location.search){
  //     const params = (qs.parse(window.location.search.substring(1)) as unknown) as SearchPizzaParams;
  //     const sort = sortList.find(obj => obj.sortProperty === params.sortBy)
      
  //     dispatch(
  //       dispatch(setFilters({
  //         searchValue: params.search,
  //         categoryId: Number(params.category),
  //         currentPage: Number(params.currentPage),
  //         sort: sort || sortList[0],
  //       }))
  //     );
  //     isSearch.current = true;
  //   }
  // }, []);

  // // Если был первый рендер, то запрашиваем пиццы
  // React.useEffect(() => {
  //   window.scrollTo(0,0);

  //   if(!isSearch.current){
  //     getPizzas();
  //   }
  //   isSearch.current = false;
  // }, [categoryId, sortType, searchValue, currentPage]);
  
  React.useEffect(() => {
    getPizzas();
  }, [categoryId, sortType, searchValue, currentPage])

  
  return(
    
    <div className="container">
        <div className="content__top">
          <Categories value={categoryId} onClickCategory={onChangeCategory} />
          <Sort />
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