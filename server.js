const express = require('express');
const bodyParser = require('body-parser');
const config = require('./modules/config');
const routes = require('./routes');
const app = express();
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

app.use(bodyParser.urlencoded({
	extended: true
}));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

passport.use(new GoogleStrategy({
		clientID: '796864924351-0sskk4r87tmpmvu5g3huvqrupr4tflu2.apps.googleusercontent.com',
		clientSecret: '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',
		callbackURL: 'http://localhost:3000/auth/google/callback'
	},
	(token, tokenSecret, profile, done) => {
		return done(null, profile);
	}));

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((user, done) => {
	done(null, user);
});

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);

// Start the Server
app.listen(config.PORT, config.HOST, () => {
	console.log(`Server started on http://${config.HOST}:${config.PORT}`);
});