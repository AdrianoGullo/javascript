const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');

//Modelagem dos dados
const loginSchema = new mongoose.Schema({
    email: {type: String, required: true},
    password: {type: String, required: true},
});

const loginModel = mongoose.model('Login', loginSchema);

class Login {
    constructor(body){
        this.body = body;
        this.errors = [];
        this.user = null;
    };

    async logar(){
        this.valida();
        if (this.errors.length > 0) return;
        this.user = await loginModel.findOne({email: this.body.email});

        if(!this.user){
            this.errors.push('Usuário não existente.');
            return;
        }
        if(!bcryptjs.compareSync(this.body.password, this.user.password)){
            this.errors.push('Senha inválida.');
            this.user = null;
            return;
        }
    };

    async register(){
        this.valida();
        if (this.errors.length > 0) return;

        await this.userExist();

        if (this.errors.length > 0) return;

        const salt = bcryptjs.genSaltSync();
        this.body.password= bcryptjs.hashSync(this.body.password, salt);

        try{
            this.user = await loginModel.create(this.body);
        } catch(e){
            console.log(e);
        }
    };
    
    async userExist(){
        this.user = await loginModel.findOne({email: this.body.email});
        if(this.user) this.errors.push('Usuário existente');
    };

    valida(){
        this.cleanUp();
        //O email precisa ser válido
        if(!validator.isEmail(this.body.email)){
            this.errors.push('Email inválido.');
        };

        //Senha de 3 a 50 caracteres
        if(this.body.password.length < 3 || this.body.password.length >= 50){
            this.errors.push('A senha precisa ter entre 3 e 50 caracteres');
        };
    };

    cleanUp(){
        for(const key in this.body){
            if (typeof this.body[key] !== 'string'){
                this.body[key] = '';
            }
        }

        this.body = {
            email: this.body.email,
            password: this.body.password,
        }
    };
}

module.exports = Login;
