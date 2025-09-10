const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');


const LoginSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: {type:String, required: true}
});

const LoginModel = mongoose.model('Login', LoginSchema);

class Login{
  constructor(body){
    this.body = body;
    this.errors = [];
    this.user = null;
  }

  async register(){
    this.valida();
    if(this.errors.length>0){
      return;
    };
    this.userExists();

    const salt = bcryptjs.genSaltSync();
    this.body.password = bcryptjs.hashSync(this.body.password, salt);
    try {
      this.user = await LoginModel.create(this.body);
    } catch (error) {
      console.error(error)
    }
  }
  valida(){
    this.cleanUp();

    if(!validator.isEmail(this.body.email)) this.errors.push('E-mail invalido');
    if(this.body.password.length<3 || this.body.password.length>51){
      this.errors.push("Senha invalida, ela deve ter entre 3 e 50 caracteres");
    }


  }
  cleanUp(){
    for(const key in this.body){
      if (typeof this.body[key] !== 'string'){
        this.body[key]= "";
      };
    };

    this.body = {
      email: this.body.email,
      password: this.body.password
    }
  }

  async userExists(){
    const user = await LoginModel.findOne({email: this.body.email})
    if(user){
      this.errors.push("Usuario já existe!!");
    }
  }

}

module.exports = Login;
