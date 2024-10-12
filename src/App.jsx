import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './component/Header/Header'
import ProductList from './component/Product/ProductList';
import ProductDetails from './component/Product/ProductDetails';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {


  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
        <ToastContainer
          position="top-center"
          autoClose={3000}
        />
      </Router>
    </>
  )
}

export default App
