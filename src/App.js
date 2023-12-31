import { useState } from 'react';
import {BrowserRouter, Routes, Route, Outlet} from "react-router-dom";
import Header from './components/Header.jsx';
import Favorites from './components/Favorites.jsx';
import Home from './components/Home.jsx';
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Header/>}>
                <Route index element={<Home/>}/>
                <Route path="favorites" element={<Favorites/>}/>
            </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
