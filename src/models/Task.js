import { Schema, model } from 'mongoose'
import paginator from 'mongoose-paginate-v2';

const taskSchema = new Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    done: { type: Boolean, default: false },
},{
    versionKey: false,
    timestamps: true
});

taskSchema.plugin(paginator);
export default model('Task', taskSchema);