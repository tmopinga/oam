module.exports = {
	index: function(req, res) {
		res.end("Hello World Mpgportal");
	},

	viewForm : function(req, res) {
		res.cookie("ObSSOCookie", "loggedoutcontinue");
		res.render("securid-forms/" + req.params.form, {origin : req.params.origin});
	},

	login: function(req, res) {

	}
}