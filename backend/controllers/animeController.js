import Anime from "../models/Anime.js";

export const getAnimes = async function (req, res) {
    const animes = await Anime.find();
    res.status(200).json(animes);
};

export const getAnimeByMalID = async function (req,res) {
    const id = req.params.id;
    try {
        const anime = await Anime.findById(id);
        res.status(200).json(anime);
    } catch (err) {
        console.error(err);
        res.status(500).send(`Erro ao buscar anime pelo ID.(ID=${id})`);
    }
};

export const getAnimeByTitulo = async function (req,res) {
    const titulo = req.params.nome;
    try {
        const anime = await Anime.findOne({ titulo });
        res.status(200).json(anime);
    } catch (err) {
        console.error(err);
        res.status(500).send(`Erro ao buscar anime pelo título.(${titulo})`);
    }
}

export const getAnimesByGenero = async function (req, res) {
    const genero = req.params.genero;
    try {
        // Busca animes onde o array "generos" contém o valor informado
        const animes = await Anime.find({ generos: genero });
        res.status(200).json(animes);
    } catch (err) {
        console.error(err);
        res.status(500).send(`Erro ao buscar animes pelo gênero.(${genero})`);
    }
}

export const getAnimeByAno = async function (req,res) {
    const ano = req.params.ano;
    try {
        const animes = await Anime.find({ ano });
        res.status(200).json(animes);
    } catch (err) {
        console.error(err);
        res.status(500).send(`Erro ao buscar animes pelo ano. (${ano})`);
    }
}