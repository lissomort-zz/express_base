module.exports = {
  isAuthenticated: function (req, res, next) {
    // if user is authenticated in the session, call the next() to call the next request handler
    // Passport adds this method to request object. A middleware is allowed to add properties to
    // request and response objects
    if (req.isAuthenticated())
      return next();
    // if the user is not authenticated then redirect him to the login page
    res.redirect('/users/login');
  },

  isNotAuthenticated: function (req, res, next) {
    // if user is not authenticated in the session, call the next() to call the next request handler
    // Passport adds this method to request object. A middleware is allowed to add properties to
    // request and response objects
    if (!req.isAuthenticated())
      return next();
    // if the user is authenticated then redirect him to the lobby page
    res.redirect('/');
  },

  restricted: function (req, res, next) {
    // aborts with 403 error in case user is not authenticated in session
    // if user is authenticated in the session, call the next() to call the next request handler
    // Passport adds this method to request object. A middleware is allowed to add properties to
    // request and response objects
    if (req.isAuthenticated())
      return next();
    res.sendStatus(403);
  }
};
