const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const port = 3001;

// Connection URI
const uri = "mongodb+srv://ufarooqbee22seecs:Nust2003@cluster0.3e5rh8q.mongodb.net/?retryWrites=true&w=majority";

// Database and collection names
const dbName = 'project';
const collectionName = 'index';

// Middleware to parse request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Endpoint to handle form submissions
app.post('/submit', async (req, res) => {
  try {
    // Connect to MongoDB Atlas
    const client = new MongoClient(uri);
    await client.connect();

    // Access the database and collection
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Insert the form data into the collection
    await collection.insertOne(req.body);

    // Close the connection
    await client.close();

    // Send a response
    res.send('<div style="display: flex;  margin:auto; justify-content: center; align-items: center; font-family: Arial, sans-serif;text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);margin-top:auto; margin-bottom:auto;height:100vh;"><p style="text-align: center; background-color:#007bff; padding:25px;border-radius:6px; font-size: 24px; color: white;">Your Message has been delivered to us!</p></div>');

  } catch (error) {
    console.error(error);
    res.status(500).send('<div style="display: flex;  margin:auto; justify-content: center; align-items: center; font-family: Arial, sans-serif;text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);margin-top:auto; margin-bottom:auto;height:100vh;"><p style="text-align: center; background-color:#007bff; padding:25px;border-radius:6px; font-size: 24px; color: #333;">Unfortunately, An Error Occured Try Again!</p></div>');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});