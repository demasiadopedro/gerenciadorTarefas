const mongoose = require('mongoose');
const validator = require('validator');


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

  register(){
    this.valida();
    if(this.errors.lengtE>0){
      return;
    };
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
        this.body[key]= ""
      };
    };

    this.body = {
      email: this.body.email,
      password: this.body.password
    }
  }

}

module.exports = Login;
