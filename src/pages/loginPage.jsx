import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === 'luiz@email.com' && senha === '123456') {
      alert('Login bem-sucedido!');
      navigate('/'); 
    } else {
      alert('Email ou senha inválidos');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Bem-vindo de volta!</h2>
        <p className="auth-subtitle">Acesse sua conta e continue sua jornada pelos animes</p>

        <form onSubmit={handleSubmit} className="auth-form">
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
          <button type="submit" className="auth-button">Entrar</button>
        </form>

        <p className="auth-footer">
          Não tem uma conta?{' '}
          <span className="auth-link" onClick={() => navigate('/register')}>
            Cadastre-se
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
