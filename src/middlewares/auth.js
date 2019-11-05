const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth')

module.exports = (req, res, next) => {
    
    //se chamar next, exta ok e vai pra controller
    const authHeader =  req.headers.authorization;

    if(!authHeader)
        return res.status(401).send({error: 'NO token provided'});

        //bearer
        const parts = authHeader.split(' ');
        
        
        if(!parts.length === 2 )
             return res.status(401).send({error: ' token error'});

        const [ scheme , token ] = parts;

        //regex para verificar se existe a palavra bearer

        if(!/^Bearer$/i.test(scheme))
               return res.status(401).send({error: ' token malformated'});

        jwt.verify(token, authConfig.secret, (err, decoded) => {
            if (err) return res.status(401).send({error: ' Invalid Token'});

            req.userId = decoded.id;
            return next();
        })
    }