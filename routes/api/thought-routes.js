const router = require('express').Router();
const { getAllThoughts, getThoughtById, addThought, updateThought, removeThought, addReaction, removeReaction } = require('../../controllers/thoughtController');

// /api/thoughts (GET)
router
    .route('/')
    .get(getAllThoughts);

// /api/thoughts/userId
router
    .route('/:userId')
    .post(addThought);

// // /api/thoughts/:id (GET one, PUT AND DELETE)
router
    .route('/:thoughtId')
    .get(getThoughtById)
    .put(updateThought)
    .delete(removeThought);


router
    .route('/reaction/:thoughtId')
    .post(addReaction)
    
router
    .route('/reaction/:thoughtId/:reactionId') 
    .delete(removeReaction);  

module.exports = router;    