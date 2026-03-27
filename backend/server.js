const express = require('express');
const authMiddleware = require('./middleware/auth');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config();
const jwt = require('jsonwebtoken');
const app = express();
const pool = require('./db');
const cors = require('cors');

app.use(express.json())
const secret = process.env.JWT_SECRET;

const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: ['https://cems-six.vercel.app', 'http://localhost:5173']
  , methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

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

//EVENT POSTING ROUTE

app.post('/events', authMiddleware, async (req, res) => {
  try {
    const { title, description, event_time } = req.body;
    if (!title || !description || !event_time) {
      return res.status(400).json({ message: 'Please provide title, description and event_time' });
    }
    const created_by = req.user.id;
    const result = await pool.query('INSERT INTO events(title,description,event_time,created_by) VALUES($1,$2,$3,$4) RETURNING *;', [title, description, event_time, created_by]);
    return res.status(201).json({
      message: 'Event created successfully',
      event: {
        id: result.rows[0].id,
        title: result.rows[0].title,
        description: result.rows[0].description,
        event_time: result.rows[0].event_time,
        created_by: result.rows[0].created_by,
      },
    });
  }

  catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
})


//retrieve all events
app.get('/events', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM events ORDER BY event_time DESC');
    return res.status(200).json({
      message: 'Events retrieved successfully',
      events: result.rows,
    });
  }
  catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
})

//create regitration
app.post('/events/:id/register', authMiddleware, async (req, res) => {
  try {
    const { id: event_id } = req.params;
    const user_id = req.user.id;
    const result = await pool.query('INSERT INTO registrations(user_id,event_id) VALUES ($1,$2) RETURNING *;', [user_id, event_id]);
    return res.status(201).json({
      message: 'Registration successful',
      registration: {
        id: result.rows[0].id,
        user_id: result.rows[0].user_id,
        event_id: result.rows[0].event_id,
      },
    });

  } catch (error) {
    console.error(error);
    if (error.code === '23505') {
      return res.status(400).json({ message: 'User already registered' });
    }
    if (error.code === '23503') {
      return res.status(404).json({ message: 'Event does not exist' });
    }
    return res.status(500).json({ message: 'Internal Server Error' });

  }
})

//GET registrations

app.get('/my-events', authMiddleware, async (req, res) => {
  try {
    const user_id = req.user.id;
    const result = await pool.query('SELECT * FROM events JOIN registrations ON events.id=registrations.event_id WHERE registrations.user_id=$1;',
      [user_id]
    );
    if (result.rows.length === 0) {
      return res.status(200).json({ message: 'No registrations found' });
    }
    return res.status(200).json({
      message: 'Registrations retrieved successfully',
      registrations: result.rows,
    });

  } catch (error) {
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
