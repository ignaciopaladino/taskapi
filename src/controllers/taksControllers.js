import Task from '../models/Task';
import { getPagination } from '../libs/getPagination'

export const getAllTasks = async (req, res) => {
    try{
        //const tasks = await Task.find().sort({createdAt: -1});
        //req.query .> ?page=12&limit=23
        //http://localhost:3000/api/tasks?size=5&page=1
        const {size, page, title}  = req.query;  
        const condition = title ? {
            title: {$regex: new RegExp(title), $options: 'i'}
        }: {};      
        const {limit, offset} = getPagination(page, size);
        const data = await Task.paginate(condition, { offset , limit});
        res.json({
            totalItems: data.totalDocs,
            taks: data.docs,
            totalPages: data.totalPages,
            currentPage: data.page - 1

        });
        //res.send('Tasks!');
    } catch(error){
        res.status(500).json({
            message: error.message || 'Something goes wrong retiving the tasks',
        });
    }
}

export const createTask = async (req, res) => {
    if(!req.body.title){
        return res.status(400).json({
            message: 'Content cannot be empty',
        });
    }
    try{
        let done = req.body.done ? req.body.done : false;
        const newTask = new Task({title: req.body.title, description: req.body.description, done: done});
        const taskSaved = await newTask.save();
        //console.log(newTask);
        res.json(taskSaved);
    } catch(error){
        res.status(500).json({
            message: error.message || 'Something goes wrong create tasks',
        });
    }
}

export const findTaskById = async (req, res) => {
    try{
        const {id} = req.params;        
        const task = await Task.findById(id);
        if(!task) return res.status(400).json({message: 'Task not found',});
        res.json(task);
    } catch(error){
        res.status(500).json({
            message: error.message || 'Something goes wrong searching the task',
        });
    }
}

export const deleteTask = async (req, res) => {
    const {id} = req.params;  
    try{
        //console.log(req.params.id)
        await Task.findByIdAndDelete(id);
        res.json({'Message': `Task Deleted!`});    
    } catch(error){
        res.status(500).json({
            message: error.message || 'Something goes wrong deleted the tasj',
        });
    }
} 

export const allDoneTaks = async (req, res) => {
    try{
        const tasks = await Task.find({done:true}).sort({createdAt: -1});
        res.json(tasks);
    } catch(error){
        res.status(500).json({
            message: error.message || 'Something goes wrong retiving the tasks',
        });
    }
    //res.send('Tasks!');
}

export const updateTask = async (req, res) => {
    try{
        const taskUpdated = await Task.findByIdAndUpdate(req.params.id, req.body)
        res.json({'Message': `Task updated!`});  
    } catch(error){
        res.status(500).json({
            message: error.message || 'Something goes wrong retiving the tasks',
        });
    }
}