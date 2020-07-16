import express, { Application } from 'express';
import mongoose from 'mongoose';
import { router as todos } from './routes/todos';


mongoose.set('useFindAndModify', false);
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

app.use(express.json());
app.use('/api/todos', todos);

app.listen(5000, () => console.log('server is listening on port 5000'));