module.exports = function(req, res, next) {
  if (req.session.userlogin) {
    return next();
  }

  sails.log.info(req.baseurl, req.path, req.ip);
  return res.redirect(req.params.origin + '/securid-forms/securid-std-login');
}  
