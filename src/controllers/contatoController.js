const Contato = require('../models/ContatoModel');

exports.index = (req, res) => {
    res.render("contato", {
        pageTitle: "Contato",
        contato: {}
    });
};

exports.register = async (req, res) => {
    try {
        const contato = new Contato(req.body);
        await contato.register();
        
        if(contato.errors.length > 0) {  // Correção aqui
            req.flash("errors", contato.errors);
            req.session.save(() => res.redirect('/contato'));  // Correção aqui
            return;
        }
        
        req.flash("success", 'Contato cadastrado com sucesso');
        req.session.save(() => res.redirect(`/contato/index/${contato.contato._id}`));  // Correção aqui
        return;
        
    } catch (error) {
        console.log(error);
        res.render("404");
    }
};

exports.editIndex= async  (req,res)=>{
    if(!req.params.id )return res.render("404");
    const contato = await Contato.buscaPorId(req.params.id)

    if(!contato) return res.render("404");
    res.render('contato', {contato})
}

exports.edit = async(req,res)=>{
    try {
        if(!req.params.id )return res.render("404");
        const contato = new Contato(req.body)
        await contato.edit(req.params.id)
        if(contato.errors.length > 0) {  // Correção aqui
            req.flash("errors", contato.errors);
            req.session.save(() => res.redirect('/contato'));  // Correção aqui
            return;
        }
            
        req.flash("success", 'Contato editado com sucesso');
        req.session.save(() => res.redirect(`/contato/index/${contato.contato._id}`));  // Correção aqui
        return;
    } catch (error) {
        console.log(error);
        res.render("404");
    }

}