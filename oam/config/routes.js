module.exports.routes = {

  'get /:origin/mpgportal': 'v1/AccessController.index',
  
  'get /:origin/securid-forms/:form' : 'v1/AccessController.viewForm',

  'post /:form/securid-std-login' : 'v1/AccessController.login'

}
