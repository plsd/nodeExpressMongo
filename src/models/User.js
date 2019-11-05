const mongoose = require('../database');
const bcrypt = require('bcryptjs')
//arquivo de modelo
//immportando mongoose


//criando Schema (como se fosse campos de uma tabela)

const UserSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        select: false
    },

    createdAt: {
        type: Date,
        default: Date.now,
    }

});

//funcao do mongoose para estabelecer que quer que seja feito algo antes do processamento   
UserSchema.pre('save', async function(next){
//funcao para gerar hash da senha, sendo encriptado 10 rounds
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;

    next();
})

//definir o model
const User = mongoose.model('User', UserSchema);

module.exports = User;