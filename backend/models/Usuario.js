import mongoose from "mongoose";

const collection_name = "dados"; // tem que ser plural

const usuarioSchema = new mongoose.Schema({
    /* especifica campos do usuário*/
    nome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    senha: {
        type: String,
        required: true
    }
})

export default mongoose.model(collection_name,usuarioSchema)