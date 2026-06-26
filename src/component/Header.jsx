import './Header.css'
import { NavLink, useNavigate } from 'react-router';
import logowhite from '../assets/images/logo-white.png'
import mobilelogowhite from '../assets/images/mobile-logo-white.png'
import cartIcon from '../assets/images/icons/cart-icon.png'
import searchIcon from '../assets/images/icons/search-icon.png'
import { useState } from 'react';

export function Header({ cart }) {
  
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  function searchProducts() {
    if(search){navigate(`/?search=${search}`);}
    else {navigate('/');}
    
  }
  function getSearch(event) {
    const searchThing = event.target.value;
    setSearch(searchThing);
  }

  function setEnterKey(event){
    if(event.key === 'Enter'){
      searchProducts();
    }
  }

  let totalQuantity = 0;
  cart.forEach((cartItem)=>{
    totalQuantity += cartItem.quantity;
  });
  
  return (
    <div className="header">
      <div className="left-section">
        <NavLink to="/" className="header-link">
          <img className="logo"
            src={logowhite} />
          <img className="mobile-logo"
            src={mobilelogowhite}/>
        </NavLink>
      </div>

      <div className="middle-section">
        <input className="search-bar" type="text" placeholder="Search" value={search} onChange={getSearch} onKeyDown={setEnterKey}/>

        <button className="search-button" onClick={searchProducts}>
          <img className="search-icon" src={searchIcon} />
        </button>
      </div>

      <div className="right-section">
        <NavLink className="orders-link header-link" to="/orders">

          <span className="orders-text">Orders</span>
        </NavLink>

        <NavLink className="cart-link header-link" to="/checkout">
          <img className="cart-icon" src={cartIcon} />
          <div className="cart-quantity">{totalQuantity}</div>
          <div className="cart-text">Cart</div>
        </NavLink>
      </div>
    </div>
  );
}