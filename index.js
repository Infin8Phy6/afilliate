const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;

app.use(express.json());

// Create a connection to the database
const db = mysql.createConnection({
  host: 'sql12.freemysqlhosting.net',
  user: 'sql12762989',
  password: 'kGgrfBqrn2',
  database: 'sql12762989',
  port: 3306,
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to the database.');
});

// Endpoint for submitting transaction
app.post('/submitTransaction', (req, res) => {
  const { txhash, walletaddress, paymentstatus } = req.body;

  // Console log before inserting
  console.log('Received transaction:', {
    txhash,
    walletaddress,
    paymentstatus,
  });

  // Insert the data into the database
  const query = `INSERT INTO afilliateprogram (txhash, walletaddress, paymentstatus) VALUES (?, ?, ?)`;
  db.query(query, [txhash, walletaddress, paymentstatus], (err, result) => {
    if (err) {
      console.error('Error inserting transaction:', err);
      res.status(500).json({ error: 'Database insertion failed' });
      return;
    }

    console.log('Transaction successfully saved to database');
    res.json({
      status: 'Transaction successfully submitted',
    });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
