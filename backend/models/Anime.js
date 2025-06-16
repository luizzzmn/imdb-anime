import mongoose from "mongoose";

const collection_name = "animes";

const animeSchema = new mongoose.Schema({
    _id:            { type: String, required: true },
    titulo:         { type: String, required: true },
    titulo_ingles:  { type: String, required: true },
    cover_url:      { type: String, required: true },
    generos:        [ String ],
    ano:            Number,
});

export default mongoose.model(collection_name, animeSchema);