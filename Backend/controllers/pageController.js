
exports.landingPage = (req, res) => {
  const isLoggedIn = req.session.loggedIn || false;
  res.json({ loggedIn: isLoggedIn });
};

exports.dashboard = (req, res) => {
  if (!req.session.loggedIn) {
    return res.status(401).json({ message: "Unauthorized, please log in." });
  }
  res.json({
    message: `Welcome to your dashboard, ${req.session.username || "User"}!`,
    username: req.session.username || "User",
  });
};

exports.loginPage = (req, res) => {
  res.json({ message: "Welcome to the Vinyl Musoc Selling Website" }); 
};


/*exports.landingPage = (req, res) => {
  const isLoggedIn = req.session.loggedIn;
  let loginButtonAction = isLoggedIn ? '/dashboard' : '/login';
  res.send(`
      <h1>Welcome to Our Landing Page</h1>
      <a href='/'><img src='logo.png' alt='Vinyl Store Logo'></a>
      <button onclick="window.location.href='${loginButtonAction}'">
          ${isLoggedIn ? 'Go to Dashboard' : 'Login'}
      </button>
  `);
};

exports.dashboard = (req, res) => {
  if (!req.session.loggedIn) {
      return res.redirect('/login');
  }
  res.send(`<h1>Welcome to your dashboard, ${req.session.username}!</h1><a href='/logout'>Logout</a>`);
};*/
