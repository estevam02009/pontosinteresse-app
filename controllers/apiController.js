const PI = require("../models/PImodel")

exports.test = function (req, res) {
    // res.send('Olá! Testando o controller')
    res.render('createPI')
}

// TODO: listar pontos de interesse da BD
// listar PIs baseado na distancia relativa aos valores de lng e lat 
// passados pelo cliente
module.exports.details = (req, res, next) => {
    let lng = parseFloat(req.query.lng)
    let lat = parseFloat(req.query.lat)
    const maxDist = 100000

    PI.aggregate([{
        '$geoNear': {
            "near": {'type': 'Point',
                "coordinates": [parseFloat(lng), parseFloat(lat)]
            },
            "spherical": true,
            "distanceField": 'dist',
            '$limit': 3,
            "maxDistance": maxDist
        }
    }])
        .then(pi => res.render('listPIs', {pis: pi}))
        .catch(next)
}

// TODO: adicionar novo ponto de interesse
exports.create = function(req, res, next) {
    // inicializar variáveis com os valores do req.body
    let nm = req.body.name
    let dt = req.body.details
    let lng = req.body.lng
    let lat = req.body.lat

    // criar variavel baseada no modelo 'PImodel' para receber dados do formulário (request)
    let data = {
        name: nm,
        details: dt,
        status: true,
        geometry: {
            "type": "point",
            "coordinates": [lng, lat]
        }
    }
    // cria novo ‘pi’ na BD a partir do request, depois, devolve o
    //‘pi’ criado ao cliente
    PI.create(data).then(function(pi){
        console.log('Documento criado com sucesso!')
        res.redirect('/api/listall')
    }).catch(next)
}

exports.listAllPIs = function(req, res, next) {
    PI.find({}).then(function(pi) {
        res.render('listPIs', {pis: pi})
    }).catch(next)
}

// listar um ponto de interesse por id (para editar)
exports.edit = function(req, res, next) {
    PI.findOne({ _id: req.params.id }).then(function(pi){
        res.render('editPI', {pi: pi})
    }).catch(next)
}

// TODO: atualizar ponto de interesse
// atualiza ‘pi’ da BD com as propriedades em ‘req.body’
// depois, procura de novo na BD o ‘pi’ atualizado (senão manda o pi // não atualizado!)
// depois, devolve o ‘pi’ atualizado ao cliente
exports.update = function(req, res, next) {
    PI.findByIdAndUpdate({ _id: req.params.id }, req.body).then(function(){
        res.redirect('/api/listall')
    }).catch(next)
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