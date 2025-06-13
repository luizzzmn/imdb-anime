import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
dotenv.config();

// importando models
import Usuario from './models/Usuario.js';

// indica uso de json pelo express
const app = express();
app.use(express.json());

// uso do CORS para regular o acesso ao backend
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
};
app.use(cors(corsOptions));

/* Método http GET */
app.get('/usuarios', async (req, res) => {
  const usuarios =  await Usuario.find();
  res.status(200).json(usuarios);
});

/* Método http POST */
app.post('/usuarios', async (req, res) => {
  const { nome, email, senha } = req.body;

  // criptografando senha
  const senhaHash = await bcrypt.hash(senha, 10);
  const usuario = { nome, email, senha:senhaHash };

  const usuarioCriado = await Usuario.create(usuario); // mongoose adiciona no bd
  res.status(201).send("usuário recebido");
});

/* Método http PUT (atualizar usuário pelo id) */
app.put('/usuarios/:id', async (req, res) => {
  const id = req.params.id;
  const dadosAtualizados = req.body;
  const usuarioAtualizado = await Usuario.findByIdAndUpdate(id, dadosAtualizados, { new: true });
  if (!usuarioAtualizado) {
    return res.status(404).send("Usuário não encontrado");
  }
  res.status(200).json(usuarioAtualizado);
});

/* Método http DELETE (remover usuário pelo id) */
app.delete('/usuarios/:id', async (req, res) => {
  const id = req.params.id;
  const usuarioRemovido = await Usuario.findByIdAndDelete(id);
  if (!usuarioRemovido) {
    return res.status(404).send("Usuário não encontrado");
  }
  res.status(200).send("Usuário removido com sucesso");
});

// Rota de login para autenticação
app.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  const usuario = await Usuario.findOne({ email });
  if (!usuario) return res.status(401).send("Email inválido");

  // verifica se a senha confere com o hash
  const senhaValida = bcrypt.compare(senha, usuario.senha);
  if (!senhaValida) return res.status(401).send("Senha inválida");

  res.status(200).json({ email: usuario.email, nome: usuario.nome, id: usuario._id });
});

// conecta ao banco de dados usando o mongoose
mongoose
  .connect(process.env.MONGODB_URI)
  .then( () => console.log("Sucesso: Mongoose conectado ao banco de dados"))
  .catch( () => console.log("Erro: falha ao conectar o mongoose ao banco de dados"))

// roda o servidor na porta 3000
app.listen(3000);