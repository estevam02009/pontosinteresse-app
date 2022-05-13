// associar as depencencias instaladas
const express = require('express')

// Inicializar express
const app = express()

let PORT = 5000

app.listen(process.env.PORT || PORT, () => {
    console.log('Servidor rodando na porta: ' + PORT)
})