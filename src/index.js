const express = require('express');
const bodyParser = require('body-parser');

//criando a aplicacao, chamando a funcao express
const app = express();

//vai utilizar o bodyParser,  funcao json e urlenconded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//criar uma rota simples, na raiz '/' 
// app.get('/', (req, res) => {
//     res.send('ok');
// });



//referenciando authController, repassando app 

require('./controllers/authController')(app);
require('./controllers/projectController')(app);




//porta que quer ouvir
app.listen(3000);



