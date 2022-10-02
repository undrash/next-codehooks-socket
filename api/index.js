import app from 'codehooks-js'; // Standard JS lib for express style code

// Create a GET endpoint route
app.get('/hello', async (req, res) => {
  console.log('I run locally, cool!');
  res.json({ message: 'Hello local world!' });
});

export default app.init(); // Bind functions to the serverless runtime
