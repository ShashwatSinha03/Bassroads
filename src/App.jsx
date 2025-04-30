import './App.css'
import Header from "./components/Header"
import Hero from './components/Hero'
import Categories from './components/Categories'
import Display from './components/Display'
import Products from './components/Products'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductDetails from './components/ProductDetails';

function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={
          <>
            <Hero/>
            <Categories/>
            <Display/>
            <Products/>
          </>
        }/>
        <Route path="/product/:id" element={<ProductDetails/>}/>
      </Routes>
    </Router>
  )
}

export default App
