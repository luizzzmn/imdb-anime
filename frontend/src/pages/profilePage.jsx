import React from 'react';
import './Profile.css';

const Profile = () => {
  const usuario = JSON.parse(localStorage.getItem('usuarioLogado'));

  if (!usuario) {
    return <div className="perfil-container"><p>Usuário não está logado.</p></div>;
  }
  console.log(decoded)

  return (
    <div className="perfil-container">
      <div className="perfil-card">
        <h2>Perfil do Usuário</h2>
        <p><span className="perfil-info-label">Nome:</span> {usuario.nome}</p>
        <p><span className="perfil-info-label">Email:</span> {usuario.email}</p>
        <p><span className="perfil-info-label">Usuário ID:</span> {usuario._id}</p>
        <button className="perfil-edit-button">Editar Perfil</button>
      </div>
    </div>
  );
};

export default Profile;
