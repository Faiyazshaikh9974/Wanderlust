const express = require("express");
const app = express();

module.exports = class ExpressErrors extends Error {
    constructor(statusCode, message){
        super();
        this.statusCode = statusCode
        this.message = message
    }
};