const express = require('express');
const router= express.Router();
const Taskcontroller = require('../controller/Taskcontroller');

router.post('/create-task',Taskcontroller.createTask); //improve naming use camelCase or create-task 
router.get('/getallTasks',Taskcontroller.getAllTasks);
router.put('/update/:id',Taskcontroller.updateTask);//  /api/task/update/:id
router.delete('/delete/:id',Taskcontroller.deleteTask); // /api/task/delete/:id
router.get('/search',Taskcontroller.searchTasks);

module.exports = router;