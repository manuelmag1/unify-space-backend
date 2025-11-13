const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://admin:teunificado16@teunificado.cdvkzcg.mongodb.net/?appName=TEUNIFICADO';
const client = new MongoClient(uri);

async function updateUserSchema() {
  try {
    await client.connect();
    console.log('✅ Conectado a MongoDB Atlas');
    
    const db = client.db('collections');
    
    // Obtener el schema actual
    const collections = await db.listCollections({ name: 'usuarios' }).toArray();
    
    if (collections.length === 0) {
      console.log('❌ Colección usuarios no encontrada');
      return;
    }
    
    console.log('📋 Schema actual encontrado');
    
    // Actualizar el schema para incluir 'manual' en orden_bloques
    await db.command({
      collMod: 'usuarios',
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['nombre', 'correo', 'contraseña_hash'],
          properties: {
            nombre: {
              bsonType: 'string',
              description: 'Nombre del usuario - requerido'
            },
            correo: {
              bsonType: 'string',
              pattern: '^.+@.+\\..+$',
              description: 'Correo electrónico válido - requerido'
            },
            contraseña_hash: {
              bsonType: 'string',
              description: 'Hash de la contraseña - requerido'
            },
            preferencias: {
              bsonType: 'object',
              properties: {
                modo: {
                  enum: ['oscuro', 'claro'],
                  description: 'Modo de tema - oscuro o claro'
                },
                idioma: {
                  enum: ['es', 'en'],
                  description: 'Idioma de la interfaz - español o inglés'
                },
                orden_bloques: {
                  enum: ['fecha_creacion', 'fecha_modificacion', 'manual'],
                  description: 'Orden de los bloques - por fecha de creación, fecha de modificación o manual'
                }
              }
            }
          }
        }
      },
      validationLevel: 'strict'
    });
    
    console.log('✅ Schema actualizado exitosamente');
    console.log('✅ El campo orden_bloques ahora acepta: fecha_creacion, fecha_modificacion, manual');
    
  } catch (error) {
    console.error('❌ Error actualizando schema:', error);
  } finally {
    await client.close();
    console.log('👋 Conexión cerrada');
  }
}

updateUserSchema();
