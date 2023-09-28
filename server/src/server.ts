import express from 'express';

const app = express();

app.use(express.json()); 

app.get("/api/v1/workout/history", (req, res) => {
  const { workoutKey } = req.query;

  if (!workoutKey) {
    return res.status(400).json({
      error: "workoutkey is required" 
    });
  }

  res.send(`GET request received for ${workoutKey}!`);
});

app.post("/api/v1/workout/save", (req, res) => {
  const body = req.body;
  
  // Do something with body...
  
  res.send("POST request received!");
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});