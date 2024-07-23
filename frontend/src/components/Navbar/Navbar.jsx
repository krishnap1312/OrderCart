
import React from 'react';
import "./Navbar.css"
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav>
    <Link to="/">Menu</Link>
    <Link to="/aboutus">About Us</Link>
    <Link to="/contact">Contact Us</Link>
    <Link to="/cart">Cart</Link>
    <Link to="/add-menu-item">Add Menu Item</Link> 
    {/* // ! uncomment this if you want to add more items  */}
  </nav>
);

export default Navbar;
