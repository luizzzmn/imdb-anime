import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';
import logo5 from '../imagens/logo6.png'

function Register() {
  const navigate = useNavigate();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('Novo usuário:', { nome, email, senha });
    alert('Cadastro realizado com sucesso!');
    navigate('/login');
  };

  return (
    <div className="auth-container">
      <div className="auth-logo">
              <img src={logo5} alt="Logo" />
            </div>
      <div className="auth-card">
        <h2 className="auth-title">Crie sua conta!</h2>
        <p className="auth-subtitle">Junte-se à comunidade e acompanhe seus animes favoritos</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <input
            type="text"
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
          <button type="submit" className="auth-button">Cadastrar</button>
        </form>

        <p className="auth-footer">
          Já tem conta?{' '}
          <span className="auth-link" onClick={() => navigate('/login')}>
            Faça login
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;
