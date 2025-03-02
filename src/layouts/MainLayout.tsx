import React from 'react'
import { Outlet } from 'react-router'
import Header from '../components/Header'

const MainLayout:React.FC = () => {
  return (<div>
    <div className="wrapper">
      <Header/>
      <div className="content">
        <Outlet/>
      </div>
    </div>
  </div>)
}

export default MainLayout
