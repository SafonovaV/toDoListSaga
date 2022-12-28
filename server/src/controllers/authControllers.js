const bcrypt = require('bcrypt');
const { User } = require('../../db/models');

const signUp = async (req, res) => {
  const { login, password, email } = req.body;

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
      res.status(200).send({ user });
    });
  } catch (error) {
    console.log(error);
    if (error.name === 'SequelizeUniqueConstraintError') {
      res
        .status(406)
        .send({ message: 'Пользователь с такой почтой уже существует' });
    } else {
      res.status(500).send({ message: 'Oшибка сервера' });
    }
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

        res.status(200).send({ user });
      });
    } else {
      res.status(401).send({ message: 'Неверный логин или пароль' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Oшибка сервера' });
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
