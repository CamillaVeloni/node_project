const moongose = require('mongoose');

const connection = moongose
        .createConnection('mongodb://127.0.0.1:27017/delivery')
        .on('open', () => {
            console.log("Mongodb connected")
        }).on('error', () => {
            console.log("Mongodb connection error")
        });

module.exports = connection;