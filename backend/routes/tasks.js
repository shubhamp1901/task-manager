const express = require('express')
const { getAllTasks, getTask, createTask, updateTask, deleteTask } = require('../controllers/tasks')
const verifyToken = require('../middlewares/verifyToken')
const router = express.Router()

router.get('/', verifyToken, getAllTasks)
router.post('/', verifyToken, createTask)
router.get('/:id', verifyToken, getTask)
router.patch('/:id', verifyToken, updateTask)
router.delete('/:id', verifyToken, deleteTask)

module.exports = router