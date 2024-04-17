import React, { useState , useContext, useRef } from 'react'
import './Navbar.css'
import logo from '../../Assets/logo.png'
import cart_icon from '../../Assets/cart_icon.png'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'
import nav_dropdown from '../../Assets/dropdown_icon.png'

const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const {getTotalCartItems}=useContext(ShopContext);
  const {isAdmin}=useContext(ShopContext);

  const menuRef=useRef();

  const dropdown_toggle = (e) => {
    menuRef.current.classList.toggle('nav-menu-visible');
    e.target.classList.toggle('open');
  }
  

  const menuItems = [
    { label: 'Shop', value: 'shop',link:'' },
    { label: 'Men', value: 'men' ,link:'mens'},
    { label: 'Women', value: 'women',link:'womens' },
    { label: 'Kids', value: 'kids',link:'kids' },
  ];

  const navClick = (val) => () => {
    setMenu(val);
  }

  return (
    <div className='navbar'>
      <div className="nav-logo">
        <img src={logo} alt="" />
        <p>SHOPPER</p>
      </div>
      
      <img className='nav-dropdown' onClick={dropdown_toggle} src={nav_dropdown} alt={nav_dropdown} />
      <ul ref={menuRef} className='nav-menu'>
        {menuItems.map((item) => {
        return (
           <li key={item.value} onClick={navClick(item.value)}>
           <Link to={item.link}>{item.label}</Link>
           {menu === item.value ? <hr /> : null}
           </li>
           );
         })}
         {isAdmin && <li onClick={navClick("admin")}>
              <Link to="admin">ADMIN</Link>
              {menu === "admin" ? <hr /> : null}
          </li>}
      </ul>


      <div className="nav-login-cart">
        {localStorage.getItem('auth-token')
        ?<button onClick={()=>{localStorage.removeItem('auth-token');window.location.replace("/")}}>Logout</button>
        :<Link to="/login"><button>Login</button></Link>}
        <Link to="/cart"><img src={cart_icon} alt="" /></Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
    </div>
  )
}

export default Navbar
