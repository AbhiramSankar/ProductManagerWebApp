
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import AddProd from './AddProd'
import UpdateProd from './UpdateProd'
import Protected from './Protected'
import Product from './Product';
import Search from './Search';
import Materials from './Materials';
import AddMat from './AddMaterials';
import UpdateMat from './UpdateMat';

function App() {


  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/" element={<Protected Cmp= {Product}/>} />
        <Route path="/add" element={<Protected Cmp= {AddProd}/>} />
        <Route path="/addmat/:id" element={<Protected Cmp= {AddMat}/>} />
        <Route path="/update/:id" element={<Protected Cmp= {UpdateProd}/>} />
        <Route path="/updatemat/:id" element={<Protected Cmp= {UpdateMat}/>} />
        <Route path="/search" element={<Protected Cmp= {Search}/>} />
        <Route path="/material/:id" element={<Protected Cmp= {Materials}/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
