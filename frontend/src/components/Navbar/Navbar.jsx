import React, { useContext, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets.js'
import { Link } from "react-router-dom"
import { useNavigate } from 'react-router-dom'
import { StoreContext } from '../../Context/StoreContext.jsx'


const Navbar = ({setShowLogin}) => {
  const [ menu, setMenu ] = useState("home")
  const {getTotalCartAmount, token, setToken} = useContext(StoreContext)
  const navigate = useNavigate()
  const NavigateToHome=()=>{
    navigate("/")
  }
  const NavigateToCart =()=>{
    navigate("/cart")
  }

  const logout = () =>{
    localStorage.removeItem("token")
    setToken("")
    navigate("/")
  }
  return (
    <div className = "navbar">
        <img onClick={()=>NavigateToHome()} src={assets.logo} alt="" className="logo" />
        <ul className="navbar-menu">
            <Link to="/" onClick={()=>setMenu("home")} className={menu === "home"? "active" : ""}>home</Link>
            <a href='#explore-menu' onClick={()=>setMenu("menu")} className={menu === "menu"? "active" : ""}>menu</a>
            <a href='#app-download' onClick={()=>setMenu("mobile-app")} className={menu === "mobile-app"? "active" : ""}>mobile-app</a>
            <a href='#footer' onClick={()=>setMenu("contact us")} className={menu === "contact us"? "active" : ""}>contact us</a>
        </ul>
        <div className="navbar-right">
            <img src={assets.search_icon} alt="" />
            <div className="navbar-search-icon">
                <img onClick={()=>NavigateToCart()} src={assets.basket_icon} alt="" />
                <div className={getTotalCartAmount()===0?"":"dot"}></div>
            </div>
            {!token ? <button onClick={()=>setShowLogin(true)}>sign in</button>: 
            <div className='navbar-profile'>
              <img src={assets.profile_icon} alt="" />
              <ul className="nav-profile-dropdown">
                <li onClick={()=>navigate("/myorders")}><img src={assets.bag_icon} alt="" />Orders</li>
                <hr />
                <li onClick={logout}><img src={assets.logout_icon} alt="" />Logout</li>
              </ul>
            </div> }
        </div>
    </div>
  )
}

export default Navbar