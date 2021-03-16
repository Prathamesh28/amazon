import React from 'react';
import {BrowserRouter, Route, Link} from 'react-router-dom'
import HomeScreen from './Components/HomeScreen'
import ProductScreen from './Components/ProductScreen'
import ProductsScreen from './Components/ProductsScreen'
import CartScreen from './Components/CartScreen'
import './App.css';
import SigninScreen from './Components/SigninScreen';
import { useSelector } from 'react-redux';
import RegisterScreen from './Components/RegisterScreen';

function App() {

  const userSignin = useSelector(state=>state.userSignin)
  const {userInfo} = userSignin;

  const openMenu = () =>{
    document.querySelector(".sidebar").classList.add("open")
  };
  const closeMenu = () =>{
    document.querySelector(".sidebar").classList.remove("open")
  }
  return (
  <BrowserRouter>
    <div className="grid-container">
        <header className="header">
            <div className="brand">
                <button onClick={openMenu}>
                    &#9776;
                </button>
                <Link to="/">Amazona</Link>
            </div>
            <div className="header-links">
                <Link to="cart.html">Cart</Link>
                {
                    userInfo ? <Link to="/profile">{userInfo.name}</Link>:
                    <Link to="/signin">SignIn</Link>
                }
            </div>
        </header>
        <aside className="sidebar">
            <h3>Shopping Categories</h3>
            <button className="sidebar-close-button" onClick={closeMenu}>X</button>
            <ul>
                <li>
                    <Link to="/">pants</Link>
                </li>
                <li>
                    <Link to="/">Shirts</Link>
                </li>
            </ul>
        </aside>
        <main className="main">
            <div className="content">
              <Route path="/signin" component={SigninScreen}/>
              <Route path="/products" component={ProductsScreen}/>
              <Route path="/products/:id" component={ProductScreen} />
              <Route path="/" exact={true} component={HomeScreen} />
              <Route path="/cart/:id?" component={CartScreen}/>
              <Route path="/register" component={RegisterScreen}/>
            </div>
        </main>
        <footer className="footer">
            All rights reserved
        </footer>
        </div>
  </BrowserRouter>
  );
}

export default App;
