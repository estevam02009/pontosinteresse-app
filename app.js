// associar as depencencias instaladas
// const { application } = require('express')
const express = require('express')

const mongoose = require('mongoose')
const bodyParser = require('body-parser')

// Inicializar express
const app = express()

// Conectar com o Banco de Dados
mongoose.connect(
    // 'mongodb+srv://infodev:kTsRkLUl6buimrVt@nodejscluster.xtbhr.mongodb.net/test?retryWrites=true&w=majority'
    'mongodb+srv://infodev:UbuntuInfodev0209@nodejscluster.xtbhr.mongodb.net/test?retryWrites=true&w=majority'
)

// confirmar locação no console
mongoose.connection.on('connected', function() {
    console.log('Conectado ao banco de dados '+'test')
})

// mensagem de erro
mongoose.connection.on('error', (err) => {
    console.log('Database error ' + err)
})

app.set('view engine', 'ejs')

// MIDDLEWARE ==========================================
app.use(express.static('./public'))
// este middlaware deve estar acima das routes-handlers!
// app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Rota raiz onde o criamos nossos PIs
app.get('/', function(req, res) {
    res.render('createPI')
})

// todo o url começado por ‘/api’ chama as rotas em ‘./routes/api’
const routes = require('./routes/api')
app.use('/api', routes)

// error handling middleware
app.use(function(err, req, res, next){
    console.log(err)
    res.status(422).send({ error: err.message })
})

// Fim do MIDDLEWARE ==========================================

let PORT = 5000

app.listen(process.env.PORT || PORT, () => {
    console.log('Servidor rodando na porta: ' + PORT)
})