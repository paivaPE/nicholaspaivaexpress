const express = require('express');
const exphbs = require('express-handlebars');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine('handlebars', exphbs.engine({ defaultLayout: false }));
app.set('view engine', 'handlebars');


const filmes = [
  { nome: 'Matrix', ano: 1999 },
  { nome: 'Interestelar', ano: 2014 },
  { nome: 'Avatar', ano: 2009 }
];

const videos = [];


app.get('/', (req, res) => {
  res.render('home', {
    titulo: 'Bem-vindo ao sistema'
  });
});

app.get('/inicio', (req, res) => {
  res.redirect('/');
});


app.get('/sobre', (req, res) => {
  res.send('Mensagem sobre a aplicação.');
});


app.get('/contato', (req, res) => {
  res.json({
    email: "contato@email.com",
    telefone: "(81) 99999-9999"
  });
});


app.get('/erro', (req, res) => {
  res.status(404).send('Página não encontrada');
});


app.get('/usuarios/:id', (req, res) => {
  res.send(`Usuário ${req.params.id}`);
});


app.get('/produtos/:nome', (req, res) => {
  res.send(`Produto ${req.params.nome}`);
});


app.get('/filmes/:id/:nome', (req, res) => {
  res.send(`ID do filme: ${req.params.id} | Nome do filme: ${req.params.nome}`);
});


app.get('/buscar', (req, res) => {
  res.send(`Buscando por: ${req.query.nome}`);
});


app.get('/produtos', (req, res) => {
  res.send(`Categoria: ${req.query.categoria} | Página: ${req.query.pagina}`);
});


app.get('/usuarios', (req, res) => {
  res.send(`Filtrando usuários com idade ${req.query.idade}`);
});


app.get('/perfil', (req, res) => {
  res.render('perfil', {
    nome: 'João',
    idade: 20
  });
});


app.get('/filmes', (req, res) => {
  res.render('filmes', {
    filmes,
    logado: true,
    admin: false
  });
});


app.get('/videos', (req, res) => {
  res.render('videos', {
    videos
  });
});

app.get('/videos/cadastrar', (req, res) => {
  res.render('cadastrarVideo');
});

app.post('/videos', (req, res) => {
  const { titulo, criador, descricao, visualizacoes, curtidas, hashtag, urlVideo, urlThumb } = req.body;

  const novoVideo = {
    titulo,
    criador,
    descricao,
    visualizacoes,
    curtidas,
    hashtag,
    urlVideo,
    urlThumb
  };

  videos.push(novoVideo);
  res.redirect('/videos');
});

app.listen(3000, () => {
  console.log('Servidor executando na porta 3000');
});
