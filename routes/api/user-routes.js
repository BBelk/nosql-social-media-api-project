const router = require('express').Router();
const { getAllUsers, createUser, getUserById, updateUser, deleteUser, addFriend, deleteFriend} = require('../../controllers/userController');

// /api/users (GET, POST)
router
    .route('/')
    .get(getAllUsers)
    .post(createUser)

// /api/users/:id (GET, PUT, DELETE)    
router
    .route('/:id')
    .get(getUserById) 
    .put(updateUser)
    .delete(deleteUser)

// // remove a users associated thoughts when deleted       
router
    .route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend)

module.exports = router;    