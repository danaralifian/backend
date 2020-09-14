const Config =require('../../config/app.config')

const db = Config.admin.firestore();

exports.insert = (payload)=>{
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

// exports.insert = (payload)=>{
    //model firestore new
//     db.collection('orders').doc(uid).collection(cart).doc(paymentId).set()
//     return new Promise(function(resolve, reject) {
//         db.collection('sampleData').doc()
//         .set(payload)
//         .then(() =>{
//             resolve(payload);
//         })
//         .catch((err)=>{
//             reject(err)
//         })
//     })
// }