const User  = require('../models/User');

module.exports = {
  //get all users
  async getAllUsers(req, res) {
      try {
          const allUsers = await User.find({});
          if (!allUsers.length) {
              res.json({ message: 'No users to find' });
              return;
          }
          res.json(allUsers);
      }
      catch (err) {
          res.json(err);
      }
  },

  // get one user by id
  async getUserById({ params }, res) {
      try {
          const dbuserData = await User.findOne({ _id: params.id })
              .populate('thoughts')
              .populate('friends')
              .select(['-__v', '-_id', '-email']);
          if (!dbuserData) {
              res.json({ message: 'Could not find a user by that Id' });
              return;
          }
          res.json(dbuserData);
      } catch (err) {
          res.json(err)
      }
  },

  // create user
  async createUser({ body }, res) {
      try {
          const createUser = await User.create(body);
          if (!createUser) {
              res.status(400).json({ message: 'A new user could not be created. Please try again.' });
          }
          res.json(createUser);
      } catch (err) {
          res.json(err, "HELLO");
      }
  }
};

// router
//     .route('/')
//     .get(getAllUsers)
//     .post(createUser)

// // /api/users/:id (GET, PUT, DELETE)    
// router
//     .route('/:id')
//     .get(getUserById) 
//     .put(updateUser)
//     .delete(deleteUser)

// // remove a users associateds thoughts when deleted       
// router
//     .route('/:userId/friends/:friendId')
//     .post(addFriend)
//     .delete(deleteFriend)