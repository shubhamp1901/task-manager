const express = require('express')
const { registerUser, loginUser, currentUser, logoutUser } = require('../controllers/users')
const verifyToken = require('../middlewares/verifyToken')
const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/logout', logoutUser)
router.get('/current', verifyToken, currentUser)

module.exports = router


