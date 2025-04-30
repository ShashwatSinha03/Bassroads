import './App.css'
import Header from "./components/Header"
import Hero from './components/Hero'
import Display from './components/Display'
import Products from './components/Products'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductDetails from './components/ProductDetails';
import Categories from './components/Categories'

function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={
          <>
            <Hero/>
            <Display/>
            <Categories/>
            <Products/>
          </>
        }/>
        <Route path="/product/:id" element={<ProductDetails/>}/>
      </Routes>
    </Router>
  )
}

export default App
