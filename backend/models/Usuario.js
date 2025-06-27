import mongoose from "mongoose";

const collection_name = "usuarios"; // tem que ser plural

// esquema principal do usuário
const usuarioSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true },
  senha: { type: String, required: true },
  pfp_url: { type: String },
  favoritos: [{ type: String, ref: 'animes' }],  // array de favoritos
  review_ids: { type: [ String ], default: [] }  // array de ids de reviews
});

export default mongoose.model(collection_name,usuarioSchema);