import React from 'react'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import About from './pages/About'
import Homepage from './pages/Homepage';
import Product from './pages/Product';
import NavBar from './components/NavBar';

const App = () => (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Homepage />}/>
        <Route path="/about" element={<About />}/>
        <Route path="/product" element={<Product />}/>
      </Routes>
    </BrowserRouter>
  )


export default App