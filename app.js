const express = require("express");
const handlebars = require("express-handlebars").engine;
const app = express();
const bodyParser = require("body-parser");
const post = require("./models/post");

app.engine("handlebars", handlebars({ defaultLayout: false }));
app.set("view engine", "handlebars");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(8081, function () {
  console.log(`Servidor ativo!`);
});

app.get("/", function (req, res) {
  res.render("cadastro");
});

app.post("/cadastrar", function (req, res) {
  post
    .create({
      nome: req.body.nome,
      endereco: req.body.endereco,
      bairro: req.body.bairro,
      cep: req.body.cep,
      cidade: req.body.cidade,
      estado: req.body.estado,
    })
    .then(function () {
      console.log("cadastrado com sucesso!");
    })
    .catch(function (erro) {
      console.log("Erro: Não encontrado!" + erro);
    });

    res.render("cadastro")
});

app.get("/consultar", function (req, res) {
  post.findAll().then(function(post){
    res.render("consultar", {post: post})
  }).catch(function(erro){
    console.log("Erro: Não encontrado!" + erro)
  })
});


app.get("/editar/:id", function (req, res) {
  post.findAll({ where: { "id": req.params.id } }).then(function (post) {
      console.log(post)
      res.render("editar", {post: post})
  }).catch(function (erro) {
      console.log("Erro: Não encontrado!" + erro)
  })
})

app.post("/atualizar", function (req, res) {
  post.update({
    nome: req.body.nome,
    endereco: req.body.endereco,
    bairro: req.body.bairro,
    cep: req.body.cep,
    cidade: req.body.cidade,
    estado: req.body.estado
  }, { where: { "id": req.body.id } }).then(function () {
    console.log("atualizado com sucesso!")
    }).catch(function (erro) {
      console.log("Erro: Não encontrado! " + erro)
    })
    
    post.findAll().then(function(post){
      res.render("consultar", {post: post})
    }).catch(function(erro){
      console.log("Erro: Não encontrado!" + erro)
    })
})

app.get("/excluir/:id", function (req, res) {
  post.destroy({ where: { "id": req.params.id } }).then(function () {
    res.render("cadastro")
    console.log("excluído com sucesso!")
  }).catch(function (erro) {
    console.log("Erro: não excluído!" + erro)
  })
})

