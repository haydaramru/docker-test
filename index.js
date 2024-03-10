const express = require('express')
const mysql = require('mysql2/promise')

const app = express()

let db;
let PORT = 3000;

async function go() {
    try {
        db = await mysql.createConnection({
            host: 'localhost',
            port: 3306,
            user: 'root',
            password: 'example',
            database: 'pets'
        });
        console.log("Database connected successfully!");

        app.listen(PORT, () => {
            console.log(`Server is listening to port ${PORT}`);
        });

    } catch (err) {
        console.error("Error connecting to database: ", err);
        process.exit(1);
    }
}

go();

app.get('/', async (req, res) => {
    try {
        const [users] = await db.execute('SELECT * FROM users');
        console.log(users);
        res.send(`<ul>${users.map(animal => `<li>${animal.name}</li>`).join('')}</ul>`);
    } catch (err) {
        console.error('Error fetching users: ', err);
        res.status(500).send('Internal Server Error');
    }
})
