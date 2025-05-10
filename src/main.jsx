import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import Home from './pages/Home.jsx'; 
import AnimePage from './pages/AnimePage.jsx';
import SearchPage from './pages/SearchPage.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter basename="/imdb-anime">
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} /> {}
        <Route path="anime/:id" element={<AnimePage />} />
        <Route path="search" element={<SearchPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
