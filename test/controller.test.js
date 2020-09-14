const FirestoreModels = require('./models/firebase.test')
const Config = require('../config/app.config')
const stripe = require('stripe')(Config.stripeKey)
const jwt = require('jsonwebtoken')
const verifyUser = require('../authorization/middlewares/verify.user.middleware')

//firebase Test
exports.firestoreInsert = (req, res)=>{
    const obj = {
        "quote":"I'm Batman",
        "author":"Batman"
    }

    FirestoreModels.insert(obj)
    .then(result=>{
        res.status(200).send(result)
    })
    .catch(err=>{
        res.status(400).send({msg : 'something error'})
    })
}

exports.payment=(req, res)=>{
    let amount = req.body.amount*100
    stripe.paymentIntents.create({
        amount,
        currency : 'usd',
        payment_method_types: ['card'],
        receipt_email: 'danaralifian@gmail.com'
    })
    .then(result=>{
        let data = {
            amount : result.amount,
            status : result.status,
            clientSecret : result.client_secret
        }
        res.status(200).send(data)
    })
    .catch(err=>{
        res.status(400).send(err)
    })
}

exports.findUserByToken=(req, res)=>{
    verifyUser.userInfo(req)
    .then(result=>{
        res.status(200).send(result)
    })
}
