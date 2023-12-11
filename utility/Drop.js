const mongoose = require('mongoose');

// Connect to your MongoDB database
mongoose.connect('mongodb+srv://todo:todo@cluster0.ivt8brg.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});



const db = mongoose.connection;

// Once connected, drop all collections
db.once('open', async () => {
  try {
    const collections = await mongoose.connection.db.collections();

    for (let collection of collections) {
      await collection.drop();
      console.log(`Collection ${collection.collectionName} dropped`);
    }

    console.log('All collections dropped');
    mongoose.connection.close();
  } catch (err) {
    console.error('Error dropping collections:', err);
    mongoose.connection.close();
  }
});