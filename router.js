const express = require('express')

exports.register = (app) => {
    app.use('/test', (req, res, next) => {res.status(200).json({"message": "Am healthy :-) !"})})
    app.use('/api/v1/users', require('./api/users'))
    app.use('/api/v1/tasks', require('./api/tasks'))
}