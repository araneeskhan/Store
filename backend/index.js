const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/api/products', (req, res) => {
  // TODO: Implement products fetch
  res.json([]);
});

app.post('/api/products', (req, res) => {
  // TODO: Implement product creation
  res.json({ message: 'Product created' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 