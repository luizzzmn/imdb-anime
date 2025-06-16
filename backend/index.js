import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import rotasUsuarios from './routes/usuarios.js';
import rotasAnimes from './routes/animes.js';


// configurações iniciais
dotenv.config();
const app = express();
app.use(express.json());


// uso do CORS para regular o acesso ao backend
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
};
app.use(cors(corsOptions));


// uso das rotas
app.use('/usuarios', rotasUsuarios);
app.use('/animes', rotasAnimes);


// conecta ao banco de dados usando o mongoose
mongoose
  .connect(process.env.MONGODB_URI)
  .then( () => console.log("Sucesso: Mongoose conectado ao banco de dados"))
  .catch( () => console.log("Erro: falha ao conectar o mongoose ao banco de dados"))


// roda o servidor
app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});