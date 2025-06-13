// src/pages/UserProfile.jsx
import React, { useEffect, useState } from 'react';
import './userProfile.css';

function UserProfile() {
  const [usuario, setUsuario] = useState(null);
  const [editando, setEditando] = useState(false);
  const [formData, setFormData] = useState({ nome: '', email: '' });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('usuarioLogado'));
    if (user) {
      setUsuario(user);
      setFormData({ nome: user.nome, email: user.email });
    }
  }, []);

  const handleEditClick = () => {
    setEditando(true);
  };

  const handleCancelClick = () => {
    setEditando(false);
    setFormData({ nome: usuario.nome, email: usuario.email });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSalvarClick = async () => {
  try {
    console.log('Enviando:', formData);
    const response = await fetch(`http://localhost:3000/usuarios/${usuario.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const respostaJson = await response.json();
    console.log('Resposta:', respostaJson);

    if (!response.ok) {
      throw new Error(respostaJson.message || 'Erro ao atualizar usuário.');
    }

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
          <div className="perfil-info">
            {editando ? (
              <>
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
              </>
            ) : (
              <>
                <p><strong>Nome:</strong> {usuario.nome}</p>
                <p><strong>Email:</strong> {usuario.email}</p>
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
        <div key={anime.mal_id} className="anime-item">
          <img src={anime.image_url} alt={anime.title} />
          <p>{anime.title}</p>
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
