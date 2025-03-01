import React from 'react';
import {Routes, Route} from 'react-router-dom';

import Home from './pages/Home';
import Cart from './pages/Cart'
import NotFound from './pages/NotFound'
import FullPizza from './pages/FullPizza';
import MainLayout from './layouts/MainLayout.jsx'
import './scss/app.scss';


function App() {


  return (
     <Routes>
       <Route path='/' element={<MainLayout/>}>
        <Route path="" exact element={<Home/> } />
        <Route path="cart" exact element={<Cart/> } />
        <Route path="pizza/:id" exact element={<FullPizza/> } />
        <Route path="*" exact element={<NotFound/>} />
      </Route>
    </Routes>
);
}

export default App;
