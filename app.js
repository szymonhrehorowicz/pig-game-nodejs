const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');
const app = express();
const port = process.env.port || 8080;

// Setting up View Engine to Handlebars
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Setting body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(bodyParser.text());

// Setting static
app.use('/public', express.static(path.join(__dirname, 'public')));

// Home route
app.get('/', (req, res) => {
  res.render('home', {
    layout: 'main',
    title: 'Pig Game'
  });
});
// Route to games history
app.get('/games', (req, res) => {
  res.render('games', {
    layout: 'main',
    title: 'Pig Game - Top Scores'
  });
});
// POST route to game( checking form if not empty)
app.post('/play', [check('playerOneName').notEmpty(), check('playerTwoName').notEmpty(), check('winningScore').notEmpty()], (req, res) => {
  const error = validationResult(req);
  // If form has empty fields
  if (!error.isEmpty()) {
    res.render('home', {
      layout: 'main',
      title: 'Pig Game - Fill all fields!',
      error: 'Please fill all fields to enter the game',
      class: 'error-input',
      playerOneName: req.body.playerOneName,
      playerTwoName: req.body.playerTwoName,
      winningScore: req.body.winningScore
    })
  } else {
    // Loading game
    res.render('play', {
      layout: 'main',
      title: 'Play Pig Game!',
      playerOneName: req.body.playerOneName,
      playerTwoName: req.body.playerTwoName,
      winningScore: req.body.winningScore
    });
  }
});
// Route to About
app.get('/about', (req, res) => {
  res.render('about', {
    layout: 'main',
    title: 'Pig Game - About'
  });
});

// Starting server
app.listen(port, () => console.log(`App is listening on port ${port}`));
