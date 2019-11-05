const express = require('express');
const User = require('../models/User.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//importando authConfig
const authConfig = require('../config/auth');

function generateToken(params = {}){
    //gerando token, passando campo unico e hash unico para aplcacao. E tbm duracao do toke 

    return jwt.sign({ params }, authConfig.secret, {
        expiresIn: 86400,
})


}


//importando/definindo express, pra tracar as rotas e o model


//definindo rotas
//Rota de registro
const router = express.Router();

router.post('/register', async (req, res) => {
    const { email } = req.body;

    try{
        //procura se ja existe email, para resposta correta
        if(await User.findOne({ email }))
            return res.status(400).send({ error: 'Usuario already exists '})

        // await aguarda fim da execucao para continuar. usando corpo da req como param
        const user = await User.create(req.body);

        //para nao retornar a senha na resposta da requisicao
        user.password = undefined;

        res.send({
            user, 
            token: generateToken({id: user.id }),
       });   
    }catch (err) {
        return res.status(400).send ({ error : 'Registration failed' });
        
    }
})


//Rota de autenticacao

router.post('/authenticate', async (req, res) => {
    const { email, password } = req.body;

    //verificando se usuario existe
    const user = await User.findOne({ email }).select('+password');
    if(!user)
        return res.status(400).send({ error: 'User not found'})

    //comparando a senha, encriptada
    if(!await bcrypt.compare(password, user.password))
         return res.status(400).send({ error: 'Invalid password'})

    user.password = undefined;

    res.send({
         user, 
         token: generateToken({id: user.id }),
    });    

} )

//recuperando instancia de app (index.js), definindo rota.
//recebendo parametro app (vindo da index.js)
//rota /auth/register para router
module.exports = app => app.use('/auth', router);





