// Footer.jsx
import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} Projeto de Disciplina - Progamação Web.</p>
    </footer>
  );
};

export default Footer;
