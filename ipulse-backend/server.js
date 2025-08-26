const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'ipulse',
});

// Connect to MySQL and log result
db.connect((err) => {
  if (err) {
    console.error('❌ Database connection failed:', err);
  } else {
    console.log('✅ Connected to MySQL database');
  }
});

// Register
app.post('/register', (req, res) => {
  const { name, email, password } = req.body;

  console.log('🔐 Register request:', req.body);

  db.query(
    'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
    [name, email, password],
    (err, result) => {
      if (err) {
        console.error('❌ Registration error:', err);
        return res.status(500).json({ success: false, message: 'Error registering user' });
      }
      res.json({ success: true, message: 'Registered successfully' });
    }
  );
});

// Login
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  console.log('🔑 Login request:', req.body);

  db.query(
    'SELECT * FROM users WHERE email = ? AND password = ?',
    [email, password],
    (err, result) => {
      if (err) {
        console.error('❌ Login error:', err);
        return res.status(500).json({ success: false, message: 'Error logging in' });
      }

      if (result.length > 0) {
        console.log('✅ User logged in:', result[0]);
        res.json({ success: true, user: result[0] });
      } else {
        console.warn('⚠️ Invalid login credentials');
        res.status(401).json({ success: false, message: 'Invalid email or password' });
      }
    }
  );
});

// Forgot Password
app.post('/forgot-password', (req, res) => {
  const { email } = req.body;

  console.log('📩 Forgot password request for:', email);

  db.query('SELECT password FROM users WHERE email = ?', [email], (err, result) => {
    if (err) {
      console.error('❌ Forgot password error:', err);
      return res.status(500).json({ success: false, message: 'Error retrieving password' });
    }

    if (result.length > 0) {
      res.json({ success: true, password: result[0].password });
    } else {
      res.status(404).json({ success: false, message: 'Email not found' });
    }
  });
});

// Start server
app.listen(3000, () => {
  console.log('🚀 Server running on http://localhost:3000');
});
