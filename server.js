// const express = require('express');
// const { MongoClient, ObjectId } = require('mongodb');

// const app = express();
// const PORT = process.env.PORT || 3000;
// const mongoURI = 'mongodb://localhost:27017';
// const dbName = 'apartmentsDB';

// app.use(express.json());

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//     next();
// });

// // Статичні файли
// app.use(express.static('public'));

// // Підключення до MongoDB
// let client;

// (async () => {
//     try {
//         client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
//         await client.connect();
//         console.log('Connected to MongoDB');
//     } catch (err) {
//         console.error('Failed to connect to MongoDB', err);
//         process.exit(1);
//     }
// })();

// // Головна сторінка
// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/public/index.html');
// });

// // Сторінка "Про нас"
// app.get('/about', (req, res) => {
//     res.sendFile(__dirname + '/public/about.html');
// });

// // Сторінка "Список квартир"
// app.get('/listing', (req, res) => {
//     res.sendFile(__dirname + '/public/listing.html');
// });

// // Сторінка "Перегляд квартири"
// app.get('/view-property', (req, res) => {
//     res.sendFile(__dirname + '/public/view-property.html');
// });

// // Роути для роботи з квартирами
// // GET запит для отримання списку квартир
// app.get('/api/apartments', async (req, res) => {
//     try {
//         const db = client.db(dbName);
//         const collection = db.collection('apartments');
//         const apartments = await collection.find({}).toArray();
//         res.json(apartments);
//     } catch (err) {
//         console.error('Failed to fetch apartments', err);
//         res.status(500).json({ error: 'Failed to fetch apartments' });
//     }
// });

// // POST запит для додавання нової квартири
// app.post('/api/apartments', async (req, res) => {
//     try {
//         const apartment = req.body;
//         const db = client.db(dbName);
//         const collection = db.collection('apartments');
//         const result = await collection.insertOne(apartment);
//         res.json({ message: 'Apartment added successfully', apartment: result.ops[0] });
//     } catch (err) {
//         console.error('Failed to add apartment', err);
//         res.status(500).json({ error: 'Failed to add apartment' });
//     }
// });

// // PUT запит для оновлення інформації про квартиру
// app.put('/api/apartments/:id', async (req, res) => {
//     try {
//         const { id } = req.params;
//         const updatedApartment = req.body;
//         const db = client.db(dbName);
//         const collection = db.collection('apartments');
//         await collection.updateOne({ _id: ObjectId(id) }, { $set: updatedApartment });
//         res.json({ message: 'Apartment updated successfully' });
//     } catch (err) {
//         console.error('Failed to update apartment', err);
//         res.status(500).json({ error: 'Failed to update apartment' });
//     }
// });

// // DELETE запит для видалення квартири
// app.delete('/api/apartments/:id', async (req, res) => {
//     try {
//         const { id } = req.params;
//         const db = client.db(dbName);
//         const collection = db.collection('apartments');
//         await collection.deleteOne({ _id: ObjectId(id) });
//         res.json({ message: 'Apartment deleted successfully' });
//     } catch (err) {
//         console.error('Failed to delete apartment', err);
//         res.status(500).json({ error: 'Failed to delete apartment' });
//     }
// });

// // Слухаємо на порті 3000
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });

// // Відключення від бази даних при завершенні процесу
// process.on('SIGINT', async () => {
//     try {
//         await client.close();
//         console.log('Disconnected from MongoDB');
//         process.exit(0);
//     } catch (err) {
//         console.error('Failed to disconnect from MongoDB', err);
//         process.exit(1);
//     }
// });
