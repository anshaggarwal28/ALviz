require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require('express-session');
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: "ALVIZ App",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb+srv://anshaggarwal2811:1234@cluster0.flgatkt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("Successfully connected to MongoDB.");
})
.catch(err => {
  console.error("Connection error", err);
});

const userSchema = new mongoose.Schema({
  username: String, // Ensure this is 'username' to match your form and app.js
  password: String
});

userSchema.plugin(passportLocalMongoose);


userSchema.plugin(passportLocalMongoose);

const User = new mongoose.model("User", userSchema);



passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.get("/", (req, res) => {
  res.render("home");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/secrets", async (req, res) => {
  try {
    const foundUsers = await User.find({ "secret": { $ne: null } });
    res.render("secrets", { usersWithSecrets: foundUsers });
  } catch (err) {
    console.error("Error fetching secrets:", err);
    res.redirect("/"); // Handle errors appropriately
  }
});

app.get("/quicksort", (req, res) => {
  res.render("quicksort");
});

app.get("/prims", (req, res) => {
  res.render("prims");
});

app.get("/bubblesort", (req, res) => {
  res.render("bubblesort");
});

app.get("/dfs", (req, res) => {
  res.render("dfs");
});

app.get("/binarytree", (req, res) => {
  res.render("binarytree");
});

app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

app.post("/register", function(req, res) {
  User.register({username: req.body.username}, req.body.password, function(err, user) {
    if (err) {
      console.log(err);
      return res.redirect("/register");
    }
    passport.authenticate("local")(req, res, function() {
      res.redirect("/secrets");
    });
  });
});

app.post("/login", function(req, res) {
  const user = new User({
    username: req.body.username,
    password: req.body.password
  });

  req.login(user, function(err) {
    if (err) {
      console.log(err);
      return res.redirect("/login");
    }
    passport.authenticate("local")(req, res, function() {
      res.redirect("/secrets");
    });
  });
});


app.listen(process.env.PORT || 3000, () => {
  console.log("Server has started successfully.");
});
