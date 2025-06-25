// src/pages/UserProfile.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../backend-services/api';
import './userProfile.css';

const URL_PADRAO = "https://cdn-icons-png.freepik.com/512/12225/12225935.png";

function UserProfile() {
  const [usuario, setUsuario] = useState(null);
  const [editando, setEditando] = useState(false);
  const [formData, setFormData] = useState({ nome: '', email: '', pfp_url: '' });
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUsuario() {
      try {
        const userLocal = JSON.parse(localStorage.getItem('usuarioLogado'));
        console.log("user Local:",userLocal);
        if (userLocal && userLocal._id) {
          const response = await api.get(`/usuarios/${userLocal._id}`);
          setUsuario(response.data);
          setFormData({ nome: response.data.nome, email: response.data.email, pfp_url: response.data.pfp_url || '' });
          localStorage.setItem('usuarioLogado', JSON.stringify(response.data));
        }
      } catch (err) {
        console.error('Erro ao buscar usuário:', err);
      }
    }
    fetchUsuario();
  }, []);

  const handleEditClick = () => {
    setEditando(true);
  };

  const handleCancelClick = () => {
    setEditando(false);
    setFormData({ nome: usuario.nome, email: usuario.email, pfp_url: usuario.pfp_url });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSalvarClick = async () => {
    try {
      const response = await api.put(`/usuarios/${usuario._id}`, formData);

      const respostaJson = response.data;

      setUsuario(respostaJson);
      localStorage.setItem('usuarioLogado', JSON.stringify(respostaJson));
      setEditando(false);
    } catch (error) {
      console.error('Erro ao salvar:', error.message);
    }
  };


  if (!usuario) {
    return <div className="page-container"><p>Carregando perfil...</p></div>;
  }

  return (
    <div className="page-container">
      <main className="perfil-content">
        <section className="perfil-card">
          <h2>Perfil do Usuário</h2>
          <div className="perfil-info-row">
            {editando ? (
              <div className="perfil-info">
                <label>
                  Nome:
                  <input
                    type="text"
                    name="nome"
                    value={formData.nome}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  Email:
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  URL da foto:
                  <input
                    type="url"
                    name="pfp_url"
                    value={formData.pfp_url}
                    onChange={handleInputChange}
                    placeholder="https://..."
                  />
                </label>
                {formData.pfp_url && (
                  <div className="foto-preview-container">
                    <img src={ formData.pfp_url || URL_PADRAO } alt="Prévia da foto" className="foto-preview" />
                    <p className="foto-preview-label">Prévia da nova foto</p>
                  </div>
                )}
              </div>
            ) : (
              <>
                <div className="perfil-info">
                  <p><strong>Nome:</strong> {usuario.nome}</p>
                  <p><strong>Email:</strong> {usuario.email}</p>
                  <p>
                    <strong>URL da foto:</strong>
                    <span className="url-resumida" title={usuario.pfp_url}>
                      {usuario.pfp_url || <em>Não definida</em>}
                    </span>
                  </p>
                </div>
                <div className="perfil-foto-container">
                  <img
                    src={ usuario.pfp_url || URL_PADRAO }
                    alt="Foto do usuário"
                    className="perfil-foto"
                  />
                </div>
              </>
            )}
          </div>

          {editando ? (
            <div className="botoes-edicao">
              <button onClick={handleSalvarClick}>Salvar</button>
              <button onClick={handleCancelClick} className="cancelar-btn">Cancelar</button>
            </div>
          ) : (
            <button onClick={handleEditClick} className="editar-btn">Editar Informações</button>
          )}
        </section>

        <section className="favoritos-section">
          <h2>Animes Favoritos</h2>
          <div className="anime-list">
            {usuario.favoritos && usuario.favoritos.length > 0 ? (
              usuario.favoritos.map((anime) => (
                <div
                  key={anime.id}
                  className="anime-item"
                  style={{ cursor: 'pointer' }}
                  onClick={() => navigate(`/anime/${anime.id}`)}
                >
                  <img src={anime.imagem} alt={anime.titulo} />
                  <p>{anime.titulo}</p>
                </div>
              ))
            ) : (
              <p>Você ainda não favoritou nenhum anime.</p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default UserProfile;
