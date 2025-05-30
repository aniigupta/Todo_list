import Task from '../Model/Note.js';

export const createTask = async (req, res) => {
    try {
        const { title, task, taskId } = req.body;

        if (!title) {
            return res.status(400).json({ message: "Title is required and cannot be empty" });
        }
        if (!task) {
            return res.status(400).json({ message: "Task description is required and cannot be empty" });
        }

        const existingTask = await Task.findOne({ title });
        if (existingTask) {
            return res.status(400).json({ message: "A task with this title already exists" });
        }

        const newTask = new Task({ title, task, taskId });
        await newTask.save();

        res.status(201).json({ message: "Task created", Task: newTask });
    } catch (err) {
        console.error("Server error in createTask:", err); 
        res.status(500).json({ message: 'Error', error: err.message });
    }
};


export const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json({ tasks });
    } catch (err) {
        res.status(500).json({ message: 'fetching error', error: err.message });
    }
};

export const deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        const task = await Task.findByIdAndDelete(id);
        if (!task) {
            return res.status(404).json({ message: 'task not found' });
        }
        res.status(200).json({ message: 'task deleted' });
    } catch (err) {
        res.status(500).json({ message: 'error', error: err.message });
    }
};

export const updateTask = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    try {
        if (!updates.task && !updates.title) {
            return res.status(400).json({ message: "bad request" });
        }
        const UpdateTask = await Task.findByIdAndUpdate(id, updates, { new: true });
        if (!UpdateTask) {
            return res.status(404).json({ message: 'task not found' });
        }
        res.status(200).json({ message: 'task updated' });
    } catch (err) {
        res.status(500).json({ message: 'error', error: err.message });
    }
};

export const searchTasks = async (req, res) => {
    const { q } = req.query;
    try {
        if (!q) {
            return res.status(400).json({ message: "query is required" });
        }
        const results = await Task.find({
            $or: [
                { title: { $regex: q, $options: 'i' } },
                { task: { $regex: q, $options: 'i' } }
            ]
        });
        res.status(200).json({ results });
    } catch (err) {
        res.status(500).json({ message: 'error', error: err.message });
    }
};


// for full word search

// exports.searchTasks = async (req, res) => {
//     const { q } = req.query;
//     try {
//         if (!q) {
//             return res.status(400).json({ message: "query is required" });
//         }
//         const results = await Task.find({ $text: { $search: q } });
//         res.status(200).json({ results });
//     } catch (err) {
//         res.status(500).json({ message: 'error', error: err.message });
//     }
// }


// for partial  word search combination does not availabe in mongodb



/*

homeground , homework
/api/task/searchTodo : 
To search Todo by its title (Level 1) : Home
To search Todo by Filters (combinations of one or more than one parameters) : title , title + description ,description 





*/

/*
1xx :
2xx : successful(200),created(201)
3xx : 
4xx : clent side error = FE ki kuch galti hai not found(404),Bad Request(400),Forbidden(403)
5xx : server side error = Hamari kuch galti hai --> Internal Server Error (500)
*/