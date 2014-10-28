module.exports = function(req, res, next) {
  //Check if user has session
  // If not redirect to the form
  // If yes, proxy request to frontend
  if (req.session.userlogin) {
    return next();
  }

  /* Set the ObFormLoginCookie
    to keep track of the original request of the user
    rh = base url (protocol://host:port)
    wu = original url (/tcx/mpgportal)
    wo = authentication level???
  */
  res.cookie('ObFormLoginCookie', 'rh=' + req.baseurl + " wu=" + req.originalUrl + " wo=1");
  return res.redirect(req.params.origin + '/securid-forms/securid-std-login');
}  
