import React from 'react';
import {Routes, Route} from 'react-router-dom';

import Header from './components/Header';

import Home from './pages/Home';
import Cart from './pages/Cart'
import NotFound from './pages/NotFound'



import './scss/app.scss';

function App() {

  return (
    <div>
      <div className="wrapper">
        <Header />
        <div className="content">
          <div className="container">
            <Routes>
              <Route path="/" exact element={<Home/> } />
              <Route path="/cart" exact element={<Cart/> } />
              <Route path="*" exact element={<NotFound/>} />
            </Routes>

          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
