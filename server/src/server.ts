import express from 'express';

const app = express();

app.use(express.json()); 

// POST endpoint
app.post('/api/post', (req, res) => {
  const body = req.body;
  
  // Do something with body...
  
  res.send('POST request received!');
});

// Start server
const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});