import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MenuItemList from './components/MenuItemList/MenuItemList';
import Navbar from './components/Navbar/Navbar';
import Cart from './components/Cart/Cart';
import AddMenuItem from './components/AddMenuItem/AddMenuItem';
import DummyComponent from './components/DummyComponent';
import Footer from './components/Footer/Footer';
import "./App.css"
import AboutUs from './components/AboutUs/AboutUs';
import ContactUs from './components/Contact/Contact';

const App = () => {
  return (
    <div className='app'>

      <Router>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<MenuItemList />} />
          <Route path="/add-menu-item" element={<AddMenuItem />} />
          {/* <Route path="/add-menu-item" element={<DummyComponent />} />  Comment the Route to use AddMenuItem */}
          <Route path="/cart" element={<Cart />} />
          <Route path="/aboutus" element={<AboutUs/>} />
          <Route path="/contact" element={<ContactUs/>} />
        </Routes>
        <Footer></Footer>
      </Router>
    </div>
  );
};

export default App;
