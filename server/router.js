const cont = require('./controllers');

const router = (app) => {
  app.get('/login', cont.Account.loginPage);
  app.post('/login', cont.Account.login);
  app.get('/signup', cont.Account.signupPage);
  app.post('/signup', cont.Account.signup);
  app.get('/logout', cont.Account.logout);
  app.get('/maker', cont.Domo.makerPage);
  app.get('/', cont.Account.loginPage);
};

module.exports = router;
