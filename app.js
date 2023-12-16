const express = require('express');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const createError = require('http-errors');
const mongoose = require('mongoose');
const signUpRouter = require('./routes/signUpRouter');
const logInRouter = require('./routes/logInRouter');
const applyMembershipRouter = require('./routes/applyMembershipRouter');
const logOutRouter = require('./routes/logOutRouter');
const createMessageRouter = require('./routes/createMessageRouter');
const verifyAdminRouter = require('./routes/verifyAdminRouter');
require('dotenv').config();
const bcrypt = require('bcryptjs');
const User = require('./models/userModel');
const Message = require('./models/messageModel');
let allMessage;

async function fetchMessage() {
  allMessage = await Message.find()
    .sort({ createdAt: -1 })
    .populate('createdBy')
    .exec();
}
fetchMessage();

const mongoDb = process.env.MONGODB_URI;
mongoose.connect(mongoDb);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongo connection error'));

const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

passport.use(
  new LocalStrategy(
    { usernameField: 'email' }, // dont forget to change usernameField if its not username
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email: email });
        if (!user) {
          return done(null, false, { message: 'incorrect email' });
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          return done(null, false, { message: 'incorrect password' });
        }
        return done(null, user); // dont forget here
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

app.use(
  session({
    secret: process.env.SESSION_SECRET, //later change to process.env
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', async (req, res) => {
  //dont forget await here cause fetchmessage is asyncfunc
  await fetchMessage();
  console.log(req.user);
  res.render('index', {
    title: 'Members Only!',
    user: req.user,
    messages: allMessage,
  });
});

app.use('/sign-up', signUpRouter);

app.use('/log-in', logInRouter);

app.use('/log-out', logOutRouter);

app.use('/apply-membership', applyMembershipRouter);

app.use('/create-message', createMessageRouter);

app.use('/admin', verifyAdminRouter);

//catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

//error handler
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  //render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3000);
