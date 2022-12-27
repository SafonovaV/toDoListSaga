const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();

const session = require('express-session');
const FileStore = require('session-file-store')(session);

const app = express();
const PORT = process.env.PORT || 3006;

const caseRoutes = require('./routes/caseRouters');
const authRoutes = require('./routes/authRoutes');

const corsOptions = {
  credentials: true,
  origin: 'http://localhost:3000',
};
app.use(cors(corsOptions));

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const sessionConfig = {
  name: 'bearCookie',
  store: new FileStore(),
  secret: process.env.SESSION_SECRET ?? 'mySecretPass',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 10,
    httpOnly: true,
  },
};

app.use(session(sessionConfig));


app.use('/', authRoutes);
app.use('/case', caseRoutes);

app.listen(PORT, () => {
  console.log(`Server starting on http://localhost:${PORT}`);
});
