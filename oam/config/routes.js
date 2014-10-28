module.exports.routes = {

  'get /:origin/mpgportal/logout/index' : 'v1/AccessController.logout',

  'get /:origin/mpgportal*': 'v1/AccessController.proxy',
  
  'get /:origin/securid-forms/:form' : 'v1/AccessController.viewForm',

  'post /login' : 'v1/AccessController.login'

}
