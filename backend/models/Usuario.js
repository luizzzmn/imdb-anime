import mongoose from "mongoose";

const collection_name = "dados"; // tem que ser plural

const usuarioSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true },
  senha: { type: String, required: true },
  favoritos: [
    {
      id: String,         
      imagem: String
    }
  ]
})

export default mongoose.model(collection_name,usuarioSchema)