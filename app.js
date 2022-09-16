const express = require('express');
const app = express();
const tasks = require('./routes/tasks');
const connectDB = require('./db/connect');
require('dotenv').config();

app.use(express.json());
app.use(express.static('./public'));

app.use('/api/v1/tasks', tasks);

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(3000, console.log('listening on port 3000'));
    }
    catch(err) {
        console.log(err);
    }
}

start();