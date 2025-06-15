import Usuario from '../models/Usuario.js'; // modelo do Usuário usado pelo mongoose
import bcrypt from 'bcrypt';


// Funções que serão usadas nas requisições http feitas pelo front ao express
// São importadas em routes/usuarios.js


// GET
export const listarUsuarios = async function (req, res) {
  const usuarios =  await Usuario.find();
  res.status(200).json(usuarios);
};


// POST
export const criarUsuario = async function (req, res) {
  const { nome, email, senha } = req.body;

  // criptografando senha
  const senhaHash = await bcrypt.hash(senha, 10);
  const usuario = { nome, email, senha:senhaHash };

  // mongoose adiciona no bd baseado no model
  const usuarioCriado = await Usuario.create(usuario);
  res.status(201).send("usuário recebido");
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

  res.status(200).json({ email: usuario.email, nome: usuario.nome, id: usuario._id });
};


// PATCH - Adicionar ou remover um anime dos favoritos
export const toggleFavorito = async function (req, res) {
  const usuario_id = req.params.id;
  const { id, titulo, imagem } = req.body;

  try {
    const usuario = await Usuario.findById(usuario_id);
    if (!usuario) return res.status(404).json({ message: "Usuário não encontrado" });

    const jaExiste = usuario.favoritos.some(fav => fav.id === id);

    if (jaExiste) {
      // Remove o favorito se já existir
      usuario.favoritos = usuario.favoritos.filter(fav => fav.id !== id);
    } else {
      // Adiciona novo favorito
      usuario.favoritos.push({ id, titulo, imagem });
    }

    await usuario.save();
    res.json(usuario); // devolve o usuário atualizado

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao atualizar favoritos." });
  }
};