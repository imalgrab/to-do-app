import express, { Application } from 'express';
import mongoose from 'mongoose';
import bodyParser from "body-parser";
import { router as todos } from './routes/todos';

const uri = 'mongodb://localhost:27017/tododb';

const connectDb = async () => {
    try {
        await mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });
        console.log('connected to mongodb');
    } catch (error) {
        console.log(error);
    }
}

connectDb();
const app: Application = express();

app.post('/test', async (req, res) => {
    const data = await req.body;
    console.log(data);
    res.json(data);
});

app.get('/test', async (req, res) => {
    res.send('ALL GOOD');
});

app.use('/api/todos', todos);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.listen(5000, () => console.log('server is listening on port 5000'));