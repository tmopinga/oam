module.exports = function(req, res, next) {

  // This is for the form
  // Prevent rendering the form if user has session already
  if (!req.session.authenticated) {
  	return next();
  }

  // Regardless of last request url, redirect user back to /mpgportal
  return res.redirect(req.params.origin + '/mpgportal/home/index');
}  
