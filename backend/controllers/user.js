const bcrypt = require("bcrypt");

const User = require("../modals/user");
const Role = require("../modals/role");

exports.createAgent = (req, res, next) => {
  let userRole;
  Role.findOne({
    roleName: "User"
  }).then(result => {
    userRole = result._id
    return userRole
  }).then(user => {
    bcrypt.hash(req.body.password, 10).then(hash => {
      const data = new User({
        userName: req.body.userName,
        emailId: req.body.emailId,
        password: hash,
        role: user
      });
      data.save().then(result => {
        res.status(201).json({
          message: "User created!"
          // result: result
        });
      }).catch(err => {
        res.status(500).json({
          message: "Cannot add user due to " + err.message
        });
      })
    }).catch(err => {
      res.status(500).json({
        message: err.message
      });
    });
  }).catch(err => {
    res.status(500).json({
      message: err.message
    });
  });

}

exports.Login = (req, res, next) => {
  let fetchedUser;
  User.findOne({
      emailId: req.body.emailId
    })
    .then(user => {
      if (!user) {
        res.status(404).json({
          message: "user doesn't exist"
        });
      } else {
        fetchedUser = user;
        return bcrypt.compare(req.body.password, user.password);
      }
    }).then(result => {
      if (!result) {
        res.status(400).json({
          message: "user not authorized"
        })
      } else {
        Role.findById({_id:fetchedUser.role}).then(result =>{
          res.status(201).json({
            message: "Login Successful",
            role: result.roleName
          });
        })
     
      }
    }).catch(err => {
      res.status(404).json({
        message: "Invalid Credentials"
      });
    })
}
