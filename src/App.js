import React,{useContext} from 'react'
import './App.css'
import Navbar from '../src/Components/Navbar/Navbar'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Shop from './Pages/Shop'
import ShopCategory from './Pages/ShopCategory'
import Product from './Pages/Product'
import Cart from './Pages/Cart'
import Footer from './Components/Footer/Footer'
import Admin from './admin/Admin'

import men_banner from './Assets/banner_mens.png'
import women_banner from './Assets/banner_women.png'
import kid_banner from './Assets/banner_kids.png'
import LoginSignup from './Pages/LoginSignup'

import { ShopContext } from './Context/ShopContext'

/*
const dotenv=require("dotenv")
dotenv.config(".env") */

const App = () => {
  const {isAdmin}=useContext(ShopContext);
  return (
    <div>{
      <Router>
      <Navbar/>
        <Routes>
          <Route path='/' element={<Shop/>}/>
          <Route path='/mens' element={<ShopCategory banner={men_banner} category="men"/>}/>
          <Route path='/womens' element={<ShopCategory banner={women_banner} category="women"/>}/>
          <Route path='/kids' element={<ShopCategory banner={kid_banner} category="kid"/>}/>
          <Route path='/product' element={<Product/>}>
               <Route path=':productId' element={<Product/>}/>
          </Route>
          <Route path='/login' element={<LoginSignup/>} />
          <Route path="/cart" element={<Cart/>} />
          
          {isAdmin && <Route path="/admin/*" element={<Admin/>}></Route>}
        </Routes>
        <Footer/>
      </Router>}
    </div>
  )
}

export default App
