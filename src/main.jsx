import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css'
import Home from './Home.jsx'
import LabPage from './LabPage.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Routes>
    <Route path='/' element={<Home />}/>
    <Route path='/playground' element={<LabPage />}/>
  </Routes>
  </BrowserRouter>,
)
