const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function updateBlockDescriptions() {
  try {
    await client.connect();
    console.log('Conectado a MongoDB Atlas');

    const db = client.db('collections');
    const blocksCollection = db.collection('bloques');

    const blocks = await blocksCollection.find({}).toArray();
    console.log(`Encontrados ${blocks.length} bloques`);

    let updated = 0;

    for (const block of blocks) {
      try {
        let descripcion = '';
        let content;

        try {
          content = typeof block.contenido === 'string' ? JSON.parse(block.contenido) : block.contenido;
        } catch {
          content = block.contenido;
        }

        if (typeof content === 'string') {
          descripcion = content.trim().substring(0, 10);
        } else if (content.text) {
          descripcion = content.text.trim().substring(0, 10);
        } else if (content.title) {
          descripcion = content.title.trim().substring(0, 10);
        } else if (content.url) {
          descripcion = content.url.trim().substring(0, 10);
        }

        await blocksCollection.updateOne(
          { _id: block._id },
          { $set: { 'metadatos.descripcion': descripcion } }
        );

        console.log(`Actualizado bloque ${block._id}: '${descripcion}'`);
        updated++;
      } catch (error) {
        console.error(`Error actualizando bloque ${block._id}:`, error.message);
      }
    }

    console.log(`Proceso completado: ${updated}/${blocks.length} bloques actualizados`);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.close();
    console.log('Conexion cerrada');
  }
}

updateBlockDescriptions();
