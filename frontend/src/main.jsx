// React e ReactDOM
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SearchProvider } from './context/SearchProvider.jsx';

// Estilo/Layout globais
import './index.css';
import App from './App.jsx';

// Páginas principais
import Home from './pages/Home.jsx';
import AnimePage from './pages/AnimePage.jsx';
import Search from './pages/Search.jsx';
import SearchResult from './pages/SearchResult.jsx';
import UserProfile from './pages/userProfile.jsx';
import Login from './pages/loginPage.jsx';
import Register from './pages/registerPage.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SearchProvider>
      <BrowserRouter basename="/imdb-anime">
        <Routes>
          {/* Rotas com Navbar */}
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="anime/:id" element={<AnimePage />} />
            <Route path="search" element={<Search />} />
            <Route path="search/:termo" element={<SearchResult />} />
            <Route path="perfil" element={<UserProfile />} />
          </Route>

          {/* Rotas sem Navbar */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register/>} />
        </Routes>
      </BrowserRouter>
    </SearchProvider>
  </React.StrictMode>
);
