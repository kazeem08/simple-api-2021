const express = require('express');

const app = express();

const cors = require('cors');

const userRouter = require('./routes/users');

app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', async (req, res) => {
  return res.json({
    message: 'Welcome to simple-api',
    response: {},
  });
});


const port = process.env.PORT || 3500;

app.use(userRouter);

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
});

module.exports = app;