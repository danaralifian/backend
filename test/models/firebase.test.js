const Config =require('../../config/app.config')

const db = Config.admin.firestore();

exports.insert = (req, res, next)=>{
    return new Promise(function(resolve, reject) {
        db.collection('orders').doc(req.userId).collection('carts').doc(req.paymentId)
        .set(req)
        .then(() =>{
            resolve(req);
        })
        .catch((err)=>{
            reject(err)
        })
    })
}

exports.insertDummy = (payload)=>{
    return new Promise(function(resolve, reject) {
        db.collection('sampleData').doc()
        .set(payload)
        .then(() =>{
            resolve(payload);
        })
        .catch((err)=>{
            reject(err)
        })
    })
}