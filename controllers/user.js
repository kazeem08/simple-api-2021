const uuid = require('uuid4');

const users = [
  { id: uuid(), name: 'Kazeem', club: 'Real Madrid' },
  { id: uuid(), name: 'Divesh', club: 'Chelsea' },
  { id: uuid(), name: 'Amna', club: 'Undecided' }
];

// check if user exist
function isUserExist(userId) {
  return users.find(({ id }) => id === userId);
}

// get user index
function getUserIndex(userId) {
  return users.findIndex(({ id }) => id === userId);
}

module.exports = {
  // get all users
  getAllUser(req, res) {

    return res.json({
      response: users,
      total: users.length,
    })
  },

  // create user
  createUser(req, res) {
    const { name, club } = req.body;

    if (!name || !club) {
      return res.status(400).json({
        response: {},
        message: 'name and club fields are required'
      });
    }

    const user = {
      name, club, id: uuid(),
    }

    // push new user to the users array
    users.push(user);

    return res.json({
      response: user,
    })
  },

  // get user by Id
  getUser(req, res) {
    const user = isUserExist(req.params.id);

    if (!user) {
      return res.status(404).json({
        response: {},
        message: 'user not found'
      });
    }

    return res.json({
      message: 'user fetched successfully',
      response: user,
    })

  },

  // update user
  updateUser(req, res) {
    const user = isUserExist(req.params.id);

    const { name, club } = req.body;
    if (!user) {
      return res.status(404).json({
        response: {},
        message: 'user not found'
      });
    }

    const userIndex = getUserIndex(user.id);

    users[userIndex].name = name || users[userIndex].name;
    users[userIndex].club = club || users[userIndex].club;

    return res.json({
      message: 'user updated successfully',
      response: users[userIndex],
    })
  },

  // delete a user
  deleteUser(req, res) {
    const user = isUserExist(req.params.id);

    if (!user) {
      return res.status(404).json({
        response: {},
        message: 'user not found'
      });
    }

    // get index of user
    const userIndex = getUserIndex(user.id)

    users.splice(userIndex, 1);

    return res.json({
      message: 'user deleted successfully',
      response: {},
    });

  }
}