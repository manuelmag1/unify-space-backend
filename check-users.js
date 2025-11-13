const { MongoClient } = require('mongodb');
const uri = 'mongodb+srv://maglioni124_db_user:2DhGuZorHlBrUTPD@teunificado.prlw7wi.mongodb.net/collections';
async function checkUsers() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db('collections');
    const collection = db.collection('usuarios');
    const users = await collection.find({}).toArray();
    console.log('Total usuarios:', users.length);
    console.log(JSON.stringify(users, null, 2));
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.close();
  }
}
checkUsers();
