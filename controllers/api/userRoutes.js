const router = require('express').Router();
const { User } = require('../../models');

// CREATE new user
router.post('/', async (req, res) => {
  try {
    const dbUserData = await User.create({
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password,
    });
    console.log('User endpoint', req.session)
    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.user_id = dbUserData.id
      res.status(200).json(dbUserData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});




router.post('/login', async (req, res) => {
  console.log(req.body)
  try {
    const dbUserData = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!dbUserData) {
      console.log('The email is the issue')
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    const validPassword = await dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      console.log('The password is the issue')
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.user_id = dbUserData.id

      res
        .status(200)
        .json({ user: dbUserData, message: 'You are now logged in!' });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Logout
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(err => {
      if (err) {
        // If there's an error in destroying the session, send a server error status
        return res.status(500).json({ message: "Failed to log out, please try again." });
      }
      // Redirect to login page after session is destroyed
      res.redirect('/login');
    });
  } else {
    // If the user is not logged in but hits the logout route, redirect them to the login page anyway
    res.redirect('/login');
  }
});


module.exports = router;


