import React from 'react';
import {Routes, Route} from 'react-router-dom';

import Header from './components/Header';

import Home from './pages/Home';
import Cart from './pages/Cart'
import NotFound from './pages/NotFound'

import './scss/app.scss';

export const SearchContext = React.createContext('')

function App() {
  const [searchValue, setSearchValue] = React.useState('');


  return (
    
      <div className="wrapper">
        <SearchContext.Provider value={{searchValue, setSearchValue}}>
          <Header/>
          <div className="content">
              <Routes>
                <Route path="/" exact element={<Home/> } />
                <Route path="/cart" exact element={<Cart/> } />
                <Route path="*" exact element={<NotFound/>} />
              </Routes>
          </div>
        </SearchContext.Provider>
      </div>
    
  );
}

export default App;
