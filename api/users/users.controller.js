const userService = require('../../services/users.service'); // talks to the db and processes requests
const mailService = require("../../services/mail.service"); // handling automated emails

exports.login = (req, res, next) => {
    userService.authenticate(req.body)
        .then(user => user ? res.status(200).json(user) : res.status(401).json({ message: 'Email or password is incorrect' }))
        .catch(err => next(err));
};

exports.create = (req, res, next) => {
    userService.create(req.body)
        .then(user => user ? res.status(200).json(user) : res.status(409).json({ message: 'User already Exists' }))
        .catch(err => next(err));
};

exports.getAll = (req, res, next) => {
    userService.getAll()
        .then(users => { res.status(200).json(users)})
        .catch(err => next(err));
};

exports.getOne = (req, res, next) => {
    userService.getOne(req.params.id)
        .then(user => user ? res.status(200).json(user) : res.status(404).json({"message": "User not found"}))
        .catch(err => next(err));
};

exports.update = (req, res, next) => {
    userService.update(req.params.id, req.body)
        .then(user=> res.status(200).json(user))
        .catch(err => next(err));
};

exports.delete = (req, res, next) => {
    userService.delete(req.params.id)
        .then(()=> res.status(200).json({}))
        .catch(err => next(err));
};

exports.deleteAll = (req, res, next) => {
    userService.deleteAll()
        .then(()=> res.status(200).json({}))
        .catch(err => next(err));
};

exports.invite = (req, res, next) => {
  mailService.inviteUser(req.body)
      .then(success =>res.status(200).json({"message":"Invite sent"}))
      .catch(err => {res.sendStatus(401); console.log(err)});
  };

exports.passwordResetToken = (req, res, next) =>{
  userService.passwordResetToken(req.body)
   .then(user=> res.status(200).json(user)) // return user object with reset code for verification
   .catch(err=> next(err));
}

exports.passwordReset =(req, res, next) => {
    userService.passwordReset(req.body)
    .then(user => res.status(200).json(user)) // return the user object if automated login is done on the client.
    .catch(err=> next(err));
}