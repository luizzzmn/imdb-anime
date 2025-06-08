import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import Home from './pages/Home.jsx';
import AnimePage from './pages/AnimePage.jsx';
import Search from './pages/Search.jsx';
import { SearchProvider } from './context/SearchProvider.jsx'; // <- atualizado
import './index.css';
import Login from './pages/loginPage.jsx';
import Register from './pages/registerPage.jsx';
import { AuthProvider } from './context/AuthContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SearchProvider>
      <AuthProvider>
      <BrowserRouter basename="/imdb-anime">
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="anime/:id" element={<AnimePage />} />
            <Route path="search" element={<Search />} />
          </Route>

          {/* Rotas sem Navbar */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register/>} />
        </Routes>
      </BrowserRouter>
      </AuthProvider>
    </SearchProvider>
  </React.StrictMode>
);
