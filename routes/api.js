const express = require("express")
const router = express.Router()

// importa controlador 'apiController.js' da pasta: 
// ‘../controllers/apiController’
const apiController = require('../controllers/apiController')

// url do teste será: http://localhost:5000/api/teste
router.get('/teste', apiController.test)

// listar todos os pontos do BD
router.get('/listall', apiController.listAllPIs)

// TODO: listar pontos de interesse no Banco de dados
router.get('/details', apiController.details)

// TODO: adicionar novo ponto de interesse
router.post('/create', apiController.create)

// tofo: rfitar PIs
router.get('/edit/:id', apiController.edit)

// TODO: atualizar ponto de interesse
router.post('/update/:id', apiController.update)

// TODO: deletar ponto de interesse
router.get('/delete/:id', apiController.delete)

module.exports = router