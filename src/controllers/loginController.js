const Login = require('../models/LoginModel')

exports.index = (req, res) => {
  res.render('login');
  return;
};

exports.register = (req, res) => {
  const login = new Login(req.body)
  login.register();

  res.send(login.errors);
  
};


