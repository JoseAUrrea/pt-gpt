const path = require('path');
const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

app.use(express.static(path.join(__dirname, 'frontend/web-build')));

// Add this catch-all route to serve index.html for all requests
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/web-build/index.html'));
});


const dotenv = require('dotenv');
dotenv.config();

const { MongoClient } = require('mongodb');
const uri = process.env.MONGODB_URI;

async function connectToDatabase() {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  try {
    // Connect the client to the server
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch(err) {
    console.error(err);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

connectToDatabase();

app.listen(PORT, () => { 
  if(NODE_ENV === 'development') {
    console.log(`Server is hosted at http://localhost:${PORT}`);
  }
});
