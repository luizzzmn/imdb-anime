import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';
import logo5 from '../imagens/logo6.png'

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password: senha }),
    });

      if (response.ok) {
      const data = await response.json();
      localStorage.setItem('token', data.access_token);

      const base64Url = data.access_token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const decoded = JSON.parse(atob(base64)); // Aqui pega dados do usuário

      localStorage.setItem('usuarioLogado', JSON.stringify(decoded));

      alert('Login bem-sucedido!');
      navigate('/');
    }else {
      const error = await response.json();
      alert(`Erro: ${error.message || 'Email ou senha inválidos'}`);
    }
  } catch (error) {
    console.error('Erro no login:', error);
    alert('Erro de conexão com o servidor.');
  }
};

  return (
    <div className="auth-container">
      <div className="auth-logo">
        <img src={logo5} alt="Logo" />
      </div>
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
