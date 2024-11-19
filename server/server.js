const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const path = require('path');
const app = express();
const PORT = 5000;

// Create a MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'pet'
});

// Enable CORS
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// API endpoint for registration
app.post('/api/register', async (req, res) => {
  try {
    const { name, address, phone, email, password } = req.body;

    // Check if the user already exists
    const checkQuery = 'SELECT * FROM users WHERE email = ?';
    connection.query(checkQuery, [email], (err, result) => {
      if (err) {
        console.error('Error checking user:', err);
        return res.status(500).json({ message: 'Error registering user' });
      }

      if (result.length > 0) {
        return res.status(409).json({ message: 'User already exists' });
      }

      // If the user doesn't exist, proceed with registration
      const saltRounds = 10;
      bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
        if (err) {
          console.error('Error hashing password:', err);
          return res.status(500).json({ message: 'Error registering user' });
        }

        const query = 'INSERT INTO users (username, address, phone, email, password) VALUES (?, ?, ?, ?, ?)';
        connection.query(query, [name, address, phone, email, hashedPassword], (err, result) => {
          if (err) {
            console.error('Error inserting user:', err);
            return res.status(500).json({ message: 'Error registering user' });
          }

          res.status(201).json({ message: 'User registered successfully' });
        });
      });
    });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Error registering user' });
  }
});

// API endpoint for login
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  // Check if the user exists
  const query = 'SELECT * FROM users WHERE email = ?';
  connection.query(query, [email], (err, result) => {
    if (err) {
      console.error('Error checking user:', err);
      return res.status(500).json({ message: 'Error logging in' });
    }

    if (result.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // User exists, check the password
    const user = result[0];
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        console.error('Error comparing passwords:', err);
        return res.status(500).json({ message: 'Error logging in' });
      }

      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      // Successful login
      res.status(200).json({ message: 'Login successful', user: { id: user.id, username: user.username, email: user.email } });
    });
  });
});

// Catch-all route to serve the frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
