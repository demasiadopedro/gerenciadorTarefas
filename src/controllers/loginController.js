const Login = require('../models/LoginModel')

exports.index = (req, res) => {
  if(req.session.user){
    return res.render('/')
  }
  res.render('login');
  return;
};
exports.register = async (req, res) => {
  try {
    const login = new Login(req.body);
    await login.register();

    if (login.errors.length > 0) {
      req.flash('errors', login.errors);
      return req.session.save(() => res.redirect('/login/')); // redireciona para a tela de login
    }

    req.flash('success', 'Seu usuário foi criado com sucesso');
    return req.session.save(() => res.redirect('/login/')); // volta para o login
  } catch (error) {
    console.error(error);
    res.render('404');
  }
};

exports.login = async (req, res) => {
  try {
    const login = new Login(req.body);
    await login.login();

    if (login.errors.length > 0) {
      req.flash('errors', login.errors);
      return req.session.save(() => {
        res.redirect('/login/')// redireciona para a tela de login
      }); 
      return;
    }

    req.flash('success', 'Bem vindo bb!!');
    req.session.user = login.user;
    return req.session.save(() => {
      return res.redirect('/')
    }); // volta para o home
  } catch (error) {
    console.error(error);
    res.render('404');
  }
};

exports.logout = async(req, res) =>{
  req.session.destroy();
  return res.redirect('/')
}
