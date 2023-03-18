var express = require('express');
var router = express.Router();
var Task = require('../controllers/tarefas')

/* GET home page. */
router.get('/', function(req, res, next) {
  Task.list()
  .then(tarefas => {

    var todo=[]
    var done=[]

    for(let i=0;i<tarefas.length;i++){
        if (tarefas[i].done=="yes") done.push(tarefas[i])
        else todo.push(tarefas[i])
    }
    res.render('index', {tdone: todo, notdone:done})
  })
  .catch(erro => {
    res.render('error', {error: erro, message: "Erro na obtenção da lista de alunos"})
  })
});

/* add new tarefa */
router.post('/', function(req, res, next) {
  Task.addtask(req.body)
    .then(
      res.redirect("/")
    )
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na obtenção da lista de alunos"})
    })
});

router.post('/', function(req, res, next) {
  Task.addtask(req.body)
    .then(
      res.redirect("/")
    )
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na obtenção da lista de alunos"})
    })
});
router.post('/delete', function(req, res, next) {
  Task.apagatarefa(req.body)
    .then(tarefa => {
      res.redirect("/")
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro ao apagar"})
    })
});
router.post('/complete', function(req, res, next) {
  Task.completeTask(req.body)
    .then(tarefa => {
      res.redirect("/")
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro ao completar"})
    })
});




module.exports = router;

