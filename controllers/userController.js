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
          const singleUserData = await User.findOne({ _id: params.id })
              // .populate('thoughts')
              .populate('friends')
              // .select(['-__v', '-_id', '-email']);
          if (!singleUserData) {
              res.json({ message: 'Could not find a user by that Id' });
              return;
          }
          res.json(singleUserData);
      } catch (err) {
          res.json(err)
      }
  },

  // create user
  async createUser({ body }, res) {
      try {
          const newUser = await User.create(body);
          if (!newUser) {
              res.status(400).json({ message: 'A new user not created, error.' });
          }
          res.json(newUser);
      } catch (err) {
          res.json(err);
      }
  },

  async updateUser({ params, body }, res) {
    try {
        const updateUserData = await User.findOneAndUpdate({ _id: params.id }, body, { new: true });
        res.json(updateUserData);
    }
    catch (err) {
        res.json(err);
    }
},

async deleteUser({ params }, res) {
  try {
      const userToDelete = await User.findOneAndDelete({ _id: params.id }, { new: true });
      if (!userToDelete) {
          res.status(404).json({ message: 'No user found with this id' });
      }
      res.json(userToDelete);
  }
  catch (err) {
      res.json(err);
  }
},

async addFriend({ params }, res) {
  try {
      const newFriendData = await User.findOne({ _id: params.friendId });
      const userToFriendData = await User.findOneAndUpdate(
          { _id: params.userId },
          { $push: { friends: newFriendData._id } },
          { new: true }
      ).populate('friends');
      res.json(userToFriendData);
  }
  catch (err) {
      res.json(err);
  }
},

async deleteFriend({ params }, res) {
  try {
      const userData = await User.findOneAndUpdate(
          { _id: params.userId },
          { $pull: { friends: { $in: [params.friendId] } } },
          { new: true }
      ).populate('friends');
      await userData.save();
      res.json(userData);
  }
  catch (err) {
      res.json(err);
  }
},
}

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