

exports.landingPage = (req, res) => {
  const isLoggedIn = req.session.loggedIn || false;
  // Return login status to the frontend
  res.status(200).json({ isLoggedIn });
  /*if (!isLoggedIn) {
    res.redirect('/login');  // Redirect to login page if not logged in
  } else {
    res.redirect('/dashboard');  // Redirect to dashboard if logged in
  }*/
};

exports.dashboard = (req, res) => {
  if (!req.session.loggedIn) {
    return res.status(401).json({ message: "Please log in" });
  }
   // Return dashboard data to the frontend
   res.status(200).json({
    message: `Welcome to your dashboard, ${req.session.username || "User"}!`,
   username: req.session.username || "User",
  });
};

