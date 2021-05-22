/* eslint-disable no-param-reassign */
const express = require('express');
const customerController = require('../controllers/customercontroller');

function routes(){
    const customerRouter = express.Router();
    const controller = customerController();

    customerRouter.route('/')
        .get(controller.get)
        .post(controller.post)

    return customerRouter;
}

module.exports = routes;