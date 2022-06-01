const express = require('express');
const session = require('express-session');
const hbs = require('express-handlebars');
const mongoose= require('mongoose') ;
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const app = express();


app.listen(8000, () => {
	console.log("Listening on port 8000");
});