const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://maglioni124_db_user:2DhGuZorHlBrUTPD@teunificado.prlw7wi.mongodb.net/collections';

async function fixIndexes() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    console.log('Conectado a MongoDB Atlas');
    const db = client.db('collections');
    const collection = db.collection('usuarios');
    const indexes = await collection.indexes();
    console.log('Indices actuales:', JSON.stringify(indexes, null, 2));
    try {
      await collection.dropIndex('email_1');
      console.log('Indice email_1 eliminado');
    } catch (e) {
      console.log('Error eliminando indice email_1:', e.message);
    }
    try {
      await collection.createIndex({ correo: 1 }, { unique: true });
      console.log('Indice correo_1 creado');
    } catch (e) {
      console.log('Error creando indice correo_1:', e.message);
    }
    const indexesAfter = await collection.indexes();
    console.log('Indices despues:', JSON.stringify(indexesAfter, null, 2));
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.close();
    console.log('Conexion cerrada');
  }
}
fixIndexes();
