const express = require('express');
const app = express();
const pool = require('./db');

app.use(express.json())

const PORT = 3000;


app.get('/', async (req, res) => {
  res.json({ Response: "I can see you" })
})

// SIGNUP ROUTE 
app.post('/users/signup', async (req, res) => {
  try {

    if (!req.body.email || !req.body.password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }
    const { email, password } = req.body;
    const response = await pool.query('INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *', [email, password]);
    res.status(201).json(`Created user ${user.rows[0].email}`);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });

  }
})

// LOGIN ROUTE
app.post('/users/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }
    const user = await pool.query('SELECT * FROM users WHERE email = $1 ', [email]);
    if (user.rows.length === 0) {
      return res.status(400).json({ message: 'User does not exist' });
    }
    if (user.rows[0].password !== password) {
      return res.status(400).json({ message: 'Incorrect password' });
    }
    return res.status(200).json({ message: 'Login successful' });


  }

  catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });

  }
})

app.listen(PORT, async () => {
  console.log(`Port is listening on Port: ${PORT}`);
  console.log(await pool.query('SELECT NOW();'));

})
