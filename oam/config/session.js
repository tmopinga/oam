module.exports.session = {

  // Session secret is automatically generated when your new app is created
  // Replace at your own risk in production-- you will invalidate the cookies of your users,
  // forcing them to log in again. 
  secret: 'a5a0f26c40f0519e33bd4101abca00ad',


  // In production, uncomment the following lines to set up a shared redis session store
  // that can be shared across multiple Sails.js servers
  adapter: 'redis',
  //
  // The following values are optional, if no options are set a redis instance running
  // on localhost is expected.
  // Read more about options at: https://github.com/visionmedia/connect-redis
  //
  host: 'localhost',
  port: 6379,
  ttl: 900,
  db: 0,
  //pass: "<redis auth password>"
  prefix: 'sess:'
};
