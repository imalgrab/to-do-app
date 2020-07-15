import mongoose, { Schema } from 'mongoose';

const TodoSchema = new Schema({
    text: {
        type: String,
        trim: true,
        required: [true, 'Text is required']
    },
    completed: {
        type: Boolean,
        default: false
    }
});

export const Todo = mongoose.model('Todo', TodoSchema);