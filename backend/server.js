const express = require('express');
const authMiddleware = require('./middleware/auth');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config();
const jwt = require('jsonwebtoken');
const app = express();
const pool = require('./db');

app.use(express.json())
const secret = process.env.JWT_SECRET;

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
    const hashedPassword = await bcrypt.hash(password, 10);
    const response = await pool.query('INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *', [email, hashedPassword]);
    return res.status(201).json({
      "message": 'User created successfully',
      "user": {
        email: response.rows[0].email,
        id: response.rows[0].id,
      },
    });
  } catch (error) {
    console.error(error);
    if (error.code === '23505') {
      return res.status(400).json({ message: 'User already exists' });
    }
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
      return res.status(404).json({ message: 'User does not exist' });
    }
    if (!await bcrypt.compare(password, user.rows[0].password)) {
      return res.status(401).json({ message: 'Incorrect password' });
    }
    const token = jwt.sign({ email: user.rows[0].email, id: user.rows[0].id }, secret, { expiresIn: '1h' });
    return res.status(200).json({ message: 'Login successful', token: token });


  }

  catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });

  }
})

// Test route for auth middleware
app.get('/me', authMiddleware, (req, res) => {
  res.json({ message: 'Test successful', user: req.user });
})

app.listen(PORT, async () => {
  console.log(`Port is listening on Port: ${PORT}`);

})
