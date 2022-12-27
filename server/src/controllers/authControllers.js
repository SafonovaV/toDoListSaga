const bcrypt = require('bcrypt');
const { User } = require('../../db/models');

const signUp = async (req, res) => {
  const { login, password, email } = req.body;

  console.log('login, password, email', login, password, email);
  try {
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      email,
      login,
      password: hashPassword,
    });

    req.session.user = { name: newUser.login, id: newUser.id };
    req.session.save(() => {
      const { user } = req.session;
      res.json({ user });
    });
  } catch (error) {
    console.log(error);
    res.json({});
  }
};

const logIn = async (req, res) => {
  const { password, email } = req.body;
  console.log(' password, email', password, email);
  try {
    const findUser = await User.findOne({ where: { email }, raw: true });
    const isValidPassvord = await bcrypt.compare(password, findUser.password);

    if (isValidPassvord) {
      req.session.user = { name: findUser.login, id: findUser.id };
      req.session.save(() => {
        const { user } = req.session;
        res.json({ user });
      });
    } else {
      res.json({});
    }
  } catch (error) {
    console.log(error);
    res.json({});
  }
};

const logOut = async (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('bearCookie');
    res.sendStatus(200);
  });
};

const checkAuth = (req, res) => {
  const user = req.session?.user;
  console.log('================', user);
  res.json({ user });
};

module.exports = {
  signUp,
  logIn,
  logOut,
  checkAuth,
};
