const DB = require("mongoose");

const express = require("express");
const app = express();

const passport = require("passport");
// const googleOauthSignIn = require("passport-google-oauth2").Strategy;

// configure a express session initialization.

// initialize a passport on every route call
app.use(passport.initialize());
// allow passport to use "express-session"
app.use(passport.session());

passport.use(new googleOauthSignIn());
