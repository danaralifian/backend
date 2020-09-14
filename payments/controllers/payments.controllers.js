const config = require('../../config/app.config')
const axios = require('axios')
const md5 = require('md5')
const _ = require('lodash')


exports.createInvoice = (req, res) => {
    console.log(res)
    res.status(200).send({data : true});
};


