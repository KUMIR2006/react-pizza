import React from 'react';
import {Routes, Route} from 'react-router-dom';

import Home from './pages/Home';

import MainLayout from './layouts/MainLayout'
import './scss/app.scss';

const Cart = React.lazy(()=> import(/* webpackChunkName: "Cart"*/ "./pages/Cart"))
const NotFound = React.lazy(()=> import(/* webpackChunkName: "NotFound"*/ "./pages/NotFound"))
const FullPizza = React.lazy(()=> import(/* webpackChunkName: "FullPizza"*/ "./pages/FullPizza"))

function App() {


  return (
     <Routes>
       <Route path='/' element={<MainLayout/>}>

        <Route path="" element={<Home/> } />

        <Route path="cart" element={
          <React.Suspense fallback={<h2>Идёт загрузка корзины...</h2>}> 
            <Cart/> 
          </React.Suspense>
        } />

        <Route path="pizza/:id" element={
          <React.Suspense fallback={<h2>Идёт загрузка...</h2>}> 
            <FullPizza/>
          </React.Suspense>
        } />

        <Route path="*" element={
          <React.Suspense fallback={<h2>Идёт загрузка...</h2>}> 
            <NotFound/>
          </React.Suspense>
        } />

      </Route>
    </Routes>
);
}

export default App;
