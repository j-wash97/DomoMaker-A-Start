const path = require('path');
const express = require('express');
const comp = require('compression');
const favicon = require('serve-favicon');
const cookie = require('cookie-parser');
const body = require('body-parser');
const mongo = require('mongoose');
const handle = require('express-handlebars');
const session = require('express-session');

const port = process.env.PORT || process.env.NODE_PORT || 3000;
const db = process.env.MONGODB_URI || 'mongodb://localhost/DomoMaker';

const mongoOpts = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongo.connect(db, mongoOpts, (err) => {
  if (err) {
    console.log(`Could not connect to ${db}`);
    throw err;
  }
});

const router = require('./router.js');

const app = express();
app.use('/assets', express.static(path.resolve(`${__dirname}/../hosted/`)));
app.use(favicon(`${__dirname}/../hosted/img/favicon.png`));
app.use(comp());
app.use(body.urlencoded({ extended: true }));
app.use(session({
  key: 'sessionid',
  secret: 'Domo Arigato',
  resave: true,
  saveUninitialized: true,
}));
app.engine('handlebars', handle({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.set('views', `${__dirname}/../views`);
app.use(cookie());

router(app);

app.listen(port, (err) => {
  if (err) {
    throw err;
  }
  console.log(`Listening on port ${port}`);
});
