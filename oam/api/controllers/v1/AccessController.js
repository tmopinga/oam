
var crypto = require('crypto');
var querystring = require('querystring');
var request = require('request').defaults({maxRedirects:1000, followRedirect: true, jar: true});

function createSSOCookie(req) {
	var cipher = crypto.createCipheriv(
					sails.config.token.mode,
					sails.config.token.key,
					sails.config.token.iv);
	var lifetime = sails.config.token.lifetime;
	var created_at = Math.round(+new Date/1000);
	var expires_at =  created_at + lifetime;
	var data =
		"userlogin=" + req.session.userlogin +
		",ip" + req.ip +
		",created_at" +  created_at +
		",expires_at" + expires_at;
	 var encrypted = cipher.update(data, 'binary');
	 return new Buffer(encrypted, 'binary').toString('base64');
}


module.exports = {
	proxy: function(req, res) {
		/*
		- Pass the request to the frontend (http.request)
			- copy all the headers
			- add userlogin in headers
		- Send the response
		*/

		var frontendUrl = sails.config.frontEnd[req.params.origin] + req.url;
		req.headers.userlogin = req.session.userlogin;
		request(frontendUrl, {headers: req.headers, cookie: req.cookies}, function(error, response, body) {
			sails.log.info(frontendUrl);
		}).pipe(res);
	},

	viewForm : function(req, res) {
		res.cookie("ObSSOCookie", "loggedoutcontinue");
		res.render("securid-forms/" + req.params.form, {origin : req.params.origin});
	},

	logout : function(req, res) {
		req.session.destroy();
		res.cookie("ObSSOCookie", "loggedoutcontinue");
		res.redirect(req.params.origin + "/mpgportal");
	},

	login : function(req, res) {
		/* RSA Authentication (use generic authentication or passport.js)

		if not authorized
		    - redirect back to the std-login form
		else if successful
		    - set the ObSSOCookie
		    - get the last requested url(rh+wu from ObFormLoginCookie) and set the cookie to done
		    - set the user session, save to redis (max timeout, idle session)
		    - redirect to last requested url
		else
		    - if response is nexttokencode
		        - set the form cookie?
				- present the nexttokencode form
		    - if response is newpin
		        - set the form cookie?
				- present the new-pin-query form
		*/

		/*  Get last requested url from ObFormLoginCookie
			Check if username == SHI
			Set ObFormLoginCookie = done
			Create ObSSOCookie
			Set session.authenticated = true, session.userlogin = SHI */
		var ObFormLoginCookie = req.cookies.ObFormLoginCookie;
		var parsedLoginCookie = querystring.parse(ObFormLoginCookie, " ");
		var redirectUrl = parsedLoginCookie.rh + parsedLoginCookie.wu;
		if(req.body.login == "SHI") {
			req.session.authenticated = true;
			req.session.userlogin = req.body.login;

			res.clearCookie("ObFormLoginCookie");
			res.cookie("ObSSOCookie", createSSOCookie(req));

			res.redirect(redirectUrl);
		} else {
			res.redirect(redirectUrl);
		}
	},

	nextTokenCode : function(req, res) {
		/*
			NextTokenCode Mode
			- Pass the username and he tokencode
				- if successfull
					- set the ObSSOCookie
				    - get the last requested url(rh+wu from ObFormLoginCookie) and set the cookie to done
				    - set the user session, save to redis (max timeout, idle session)
				    - redirect to last requested url
				- if not redirect to std-login form
		*/
	},

	newPin : function(req, res) {
		/*
			NewPin Mode
			- Check what is the post for
				- if from new-pin-query, choice of new pin generation (system generated)
					- render the accept-new-pin form
				- else if from new-pin-qeury
					- check the username and passcode
						- if successful
							- render enter-new-pin form
						- if not
							- back to the std-login form or new-pin-query?
				- else if from accept-new-pin
					- check the username and passcode
						- if successful
							- create new pin? or rsa will create that already?
							- render the new-pin page (will redirect to original request after 30secs)
						- if not
							- back to the std-login form or accept-new-pin?
				- else if from enter-new-pin
					- pass to the rsa the new pin
					- render the new-pin page (will redirect to original request after 30secs)
		*/
	}
}