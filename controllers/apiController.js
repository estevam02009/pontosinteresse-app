const PI = require("../models/PImodel")

exports.test = function (req, res) {
    res.send('Olá! Testando o controller')
}

// TODO: listar pontos de interesse da BD
exports.details = function(req, res) {
    res.send({type: 'GET'})
}

// TODO: adicionar novo ponto de interesse
exports.create = function(req, res, next) {
    // cria novo ‘pi’ na BD a partir do request, depois, devolve o
    //‘pi’ criado ao cliente
    PI.create(req.body).then(function(pi){
        res.send(pi)
    }).catch(next)
}

// TODO: atualizar ponto de interesse
exports.update = function(req, res) {
    res.send({type: 'PUT'})
}

// TODO: deletar ponto de interesse
// ‘_id:’->nome da propriedade na BD, 
// ‘req.params.id’->devolve-me o parametro id na req
exports.delete = function(req, res, next) {
    // apaga ‘pi’ da BD, depois, devolve o ‘pi’ apagado ao cliente
    PI.findByIdAndRemove({ _id: req.params.id }).then(function(pi){
        res.send(pi)
    }).catch(next)
    // res.send({type: 'DELETE'})
}