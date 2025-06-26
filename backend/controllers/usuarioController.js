import Usuario from '../models/Usuario.js'; // modelo do Usuário usado pelo mongoose
import bcrypt from 'bcrypt';


// Funções que serão usadas nas requisições http feitas pelo front ao express
// São importadas em routes/usuarios.js


// GET
export const listarUsuarios = async function (req, res) {
  const usuarios =  await Usuario.find();
  res.status(200).json(usuarios);
};


// GET
export const getUsuario = async function (req,res) {
  const id = req.params.id;
  try {
    const usuario = await Usuario.findById(id);
    res.status(200).json(usuario);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao buscar um usuário." });
  }
}


// POST
export const criarUsuario = async function (req, res) {
  const { nome, email, senha } = req.body;

  // criptografando senha
  const senhaHash = await bcrypt.hash(senha, 10);
  const usuario = { nome, email, senha:senhaHash };

  // mongoose adiciona no bd baseado no model
  const usuarioCriado = await Usuario.create(usuario);
  res.status(201).json(usuarioCriado);
};


// PUT
export const atualizarUsuario = async function (req, res) {
  const id = req.params.id;
  const dadosAtualizados = req.body;

  const usuarioAtualizado = await Usuario.findByIdAndUpdate(id, dadosAtualizados, { new: true });
  if (!usuarioAtualizado) {
    return res.status(404).send("Usuário não encontrado");
  }
  res.status(200).json(usuarioAtualizado);
};


// DELETE
export const deletarUsuario = async function (req, res) {
  const id = req.params.id;
  const usuarioRemovido = await Usuario.findByIdAndDelete(id);
  if (!usuarioRemovido) {
    return res.status(404).send("Usuário não encontrado");
  }
  res.status(200).send("Usuário removido com sucesso");
};


// POST (Login)
export const loginUsuario = async function (req, res) {
  const { email, senha } = req.body;

  const usuario = await Usuario.findOne({ email });
  if (!usuario) return res.status(401).send("Email inválido");

  // verifica se a senha confere com o hash
  const senhaValida = bcrypt.compare(senha, usuario.senha);
  if (!senhaValida) return res.status(401).send("Senha inválida");

  res.status(200).json(usuario);
};


// PATCH - Adicionar ou remover um anime dos favoritos
export const toggleFavorito = async function (req, res) {
  const usuario_id = req.params.id;
  const { animeId } = req.body; // espera { animeId: "id_do_anime" }

  try {
    const usuario = await Usuario.findById(usuario_id);
    if (!usuario) return res.status(404).json({ message: "Usuário não encontrado" });

    const jaExiste = usuario.favoritos.includes(animeId);

    if (jaExiste) {
      // Remove o favorito se já existir
      usuario.favoritos = usuario.favoritos.filter(favId => favId !== animeId);
    } else {
      // Adiciona novo favorito
      usuario.favoritos.push(animeId);
    }

    await usuario.save();
    res.json(usuario); // devolve o usuário atualizado

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao atualizar favoritos." });
  }
};

// PATCH - Adicionar ou remover o id de uma review ao usuário (toggle)
export const toggleReviewId = async function (req, res) {
  const usuario_id = req.params.id;
  const { reviewId } = req.body; // espera { reviewId: "id_da_review" }

  try {
    const usuario = await Usuario.findById(usuario_id);
    if (!usuario) return res.status(404).json({ message: "Usuário não encontrado" });

    const jaExiste = usuario.review_ids.includes(reviewId);

    if (jaExiste) {
      // Remove a review se já existir
      usuario.review_ids = usuario.review_ids.filter(id => id !== reviewId);
    } else {
      // Adiciona a review se não existir
      usuario.review_ids.push(reviewId);
    }

    await usuario.save();
    res.json(usuario); // devolve o usuário atualizado
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao atualizar reviews do usuário." });
  }
};