const taskService = require('../../services/tasks.service');

exports.create = (req, res, next) => {
    taskService.create(req.body)
        .then(task => res.status(200).json(task))
        .catch(err => next(err));
};

exports.getAll = (req, res, next) => {
    taskService.getAll()
        .then(tasks => { res.status(200).json(tasks)})
        .catch(err => next(err));
};

exports.getOne = (req, res, next) => {
    taskService.getOne(req.params.id)
        .then(task => task ? res.status(200).json(task) : res.status(404).json({"message":"Task not found"}))
        .catch(err => next(err));
};

exports.update = (req, res, next) => {
    taskService.update(req.params.id, req.body)
        .then(task=> res.status(200).json(task))
        .catch(err => next(err));
};

exports.delete = (req, res, next) => {
    taskService.delete(req.params.id)
        .then(()=> res.status(200).json({}))
        .catch(err => next(err));
};

exports.deleteAll = (req, res, next) => {
    taskService.deleteAll()
        .then(()=> res.status(200).json({}))
        .catch(err => next(err));
};

exports.getByUser =(req, res, next) => {
    taskService.getByUser(req.params.id)
    .then(tasks => res.status(200).json(tasks))
    .catch(err=> next(err));
}