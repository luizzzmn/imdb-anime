import mongoose from "mongoose";

const collection_name = "usuarios"; // tem que ser plural

// sub-esquema para definir o formato dos favoritos
const favoritoSchema = new mongoose.Schema({
  id: { type: String, required: true },
  titulo: { type: String, required: true },
  imagem: { type: String, required: true }
}, { _id: false }); // _id: false para não criar id automático para cada favorito

// esquema principal do usuário
const usuarioSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true },
  senha: { type: String, required: true },
  pfp_url: { type: String },
  favoritos: { type: [ favoritoSchema ], default: [] },  // array de favoritos
  review_ids: { type: [ String ], default: [] }  // array de ids de reviews
});

export default mongoose.model(collection_name,usuarioSchema);