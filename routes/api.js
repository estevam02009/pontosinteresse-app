const express = require("express")
const router = express.Router()

// importa controlador 'apiController.js' da pasta: 
// ‘../controllers/apiController’
const apiController = require('../controllers/apiController')

// url do teste será: http://localhost:5000/api/teste
router.get('/teste', apiController.test)

// TODO: listar pontos de interesse no Banco de dados
router.get('/details', apiController.details)

// TODO: adicionar novo ponto de interesse
router.post('/interest', apiController.create)

// TODO: atualizar ponto de interesse
router.put('/interest/:id', apiController.update)

// TODO: deletar ponto de interesse
router.delete('/interest/:id', apiController.delete)

module.exports = router