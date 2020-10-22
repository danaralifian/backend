const FirestoreModels = require('./models/firebase.test')
const Config = require('../config/app.config')
const stripe = require('stripe')(Config.stripeKey)
const jwt = require('jsonwebtoken')
const verifyUser = require('../authorization/middlewares/verify.user.middleware')
const { response } = require('express')
const { result } = require('lodash')
const { Types } = require('mongoose')
const { type } = require('server/reply')
const { Int32 } = require('mongodb')

//firebase Test
exports.firestoreInsert = (req, res)=>{
    const obj = {"amount":7,"carts":[{"active":true,"assurance":false,"available_countries":[],"category":{"id":401,"name":"Aksesoris Interior","structure":["Mobil, Part dan Aksesoris","Aksesoris Mobil","Aksesoris Interior"],"url":"https://www.bukalapak.com/c/mobil-part-dan-aksesoris/aksesoris-mobil/aksesoris-interior"},"condition":"Baru","created_at":"2018-02-10T23:45:26Z","deal":{"applied_date":"2020-07-13T17:00:00Z","discount_price":108000,"expired_date":"2022-07-14T16:59:59Z","original_price":120000,"percentage":10},"default_catalog":null,"description":"Warna Terbaru Lebih Oke dan Kece dengan Warna Hitam <br><br/>BARU DAN ORIGINAL 100%<br><br/>GARANSI 1 TAHUN RESMI VIVAN INDONESIA<br><br/>#DijaminOri #DijaminResmi #DijaminBergaransi<br><br/>VIVAN CHS05 Car Stent Suction Cup Automatic Lock 360  Black<br><br/>Spesifikasi:<br><br/>Brand : VIVAN<br><br/>Material : ABS<br><br/>Color : Black<br><br/>Rotation angle : 360  rotation<br><br/>Chuck opening method : automatic switch<br><br/>Applicable mobile phone : size\t4.0-6.5 inches<br><br/>Product net weight : 159g<br><br/>Pengenalan Produk:<br><br/>2. Dapat diletakkan di kaca atau dashboard<br><br/>3. Metode penjepitan smartphone dapat dilakukan secara otomatis atau manual <br><br/>4. Dibekali Squeeze Suction Cup untuk meningkatkan daya lekat yang lebih kuat hingga 10x lipat sehingga car holder <br><br/>sangat stabil dan tidak goyang saat digunakan<br><br/>5. Dilengkapi dengan fitur crane yang dapat diperpanjang hingga 16,5cm, agar smartphone dapat lebih mudah dijangkau oleh pengemudi<br><br/>6. Pada bagian bawah pengunci terdapat sebuah celah kabel untuk memudahkan akses pengisian daya saat smartphone sedang terpasang<br><br/>7. Memiliki rotasi 360 untuk memudahkan pengoperasian smartphone dengan berbagai angle <br><br/>8. Material ABS<br><br/>9. Cocok untuk Smartphone dengan display 4.0 - 6.5 inch<br><br/>10. Berat produk 159g<br><br/>In The Box:<br><br/>1 x Car Holder Vivan <br><br/>1 x Kartu Garansi","digital_product":false,"for_sale":true,"id":"eu8dld","images":{"large_urls":["https://s0.bukalapak.com/img/57974020542/large/data.jpeg","https://s4.bukalapak.com/img/46484020542/large/data.jpeg","https://s3.bukalapak.com/img/39974020542/large/data.jpeg","https://s0.bukalapak.com/img/03584020542/large/data.jpeg","https://s1.bukalapak.com/img/16805020542/large/data.jpeg"],"small_urls":["https://s0.bukalapak.com/img/57974020542/small/data.jpeg","https://s4.bukalapak.com/img/46484020542/small/data.jpeg","https://s3.bukalapak.com/img/39974020542/small/data.jpeg","https://s0.bukalapak.com/img/03584020542/small/data.jpeg","https://s1.bukalapak.com/img/16805020542/small/data.jpeg"]},"imported":true,"installments":[],"max_quantity":2147483647,"min_quantity":1,"name":"Car Holder For Your Smart Phone High Quality Product","price":108000,"product_sin":[],"rating":{"average_rate":4.9,"user_count":21},"relisted_at":"2020-08-28T23:02:43Z","rush_delivery":false,"shipping":{"force_insurance":false,"free_shipping_coverage":[2,7]},"sku_id":891266609,"sla":{"type":"custom","value":4},"special_campaign_id":929,"specs":{"brand":"Lainnya"},"state":"available","state_description":[],"stats":{"interest_count":131,"sold_count":31,"view_count":0,"waiting_payment_count":-113},"stock":673,"store":{"address":{"city":"Jakarta Pusat","province":"DKI Jakarta"},"alert":"","avatar_url":"https://s0.bukalapak.com/avt/56210754/small/LA-LM-FOREVER.png","brand_seller":false,"carriers":["JNE REG"],"closing":{"closed":false},"delivery_time":"1-2 hari","description":"LA LM FOREVER adalah Online Shop yang telah menjalin kerjasama dengan Supplier dan Distributor terbaik Se-Indonesia!!! Tidak percaya? silakan cek barang-barang kami pada etalase kami.!!! Hampir ribuan produk berkualitas berada dietalase kami jadi apa lagi yang kalian cari!!","flagship":false,"groups":[],"header_image":{"url":"https://s1.bukalapak.com/hdr/69012453/normal/4432f75eb60841d37d73."},"id":39419897,"inactivity":{"inactive":false,"last_appear_at":"2020-09-02T00:55:04.701+07:00"},"last_order_schedule":{"friday":"13:00","monday":"13:00","saturday":"13:00","thursday":"13:00","tuesday":"13:00","wednesday":"13:00"},"level":{"image_url":"https://s0.bukalapak.com/images/badge/seller/xhdpi/level-6.png","name":"Good Seller"},"name":"LA LM FOREVER","premium_level":"platinum","premium_top_seller":true,"rejection":{"recent_transactions":100,"rejected":0},"reviews":{"negative":0,"positive":5528},"sla":{"type":"normal","value":2},"subscriber_amount":639,"term_and_condition":"<p>Kami adalah Online Shop yang bekerja sama dengan Supplier Distributor terbaik Se-Indonesia, anda bisa cek barang-barang yang ada dilapak kami dan hampir semua barang dilapak LA LM FOREVER berkualitas, anda bisa menemukan barang-barang yang belum pernah anda lihat dilapak lain karena kami telah menjalin usaha kerja sama dengan Supplier terbaik di Indonesia dan anda bisa lihat feedback dari lapak kami, Insya Allah 100% Positif dan puas terhadap barang kami.</p>\n\n<p>Setiap barang-barang yang kami jual sudah dijelaskan dengan detail pada deskripsi barang dan anda sebagai pembeli tolong budidayakan membaca yah sebelum membeli agar lebih yakin dan jika ada yang ingin disampaikan silakan chat kami, Insya Allah kami selalu fast respon terkecuali jika memasuki waktu-waktu shalat yah..</p>\n\n<p>LA LM FOREVER juga akan memberikan kejutan Door Prize bagi para pelanggan yang sering berbelanja dilapak kami yah. Bonus akan diberikan sesuai dengan jumlah besarnya belanjaan dan bonus barang akan kami pilih secara random.</p>\n\n<p>Jangan lupa klik berlangganan yah agar bisa mengetahui update barang-barang terbaru di LA LM FOREVER!!</p>\n\n<p>Bagi para pembeli jika ingin melakukan komplain silakan chat terlebih dahulu jangan tiba-tiba kasih ulasan yang kurang baik karena semua barang yang akan dikirim telah diproses melalui QC yang ketat sehingga siap dikirim, dan tolong gunakan bahasa yang sopan yah agar kami juga senang hati membantu anda.</p>\n\n<p>Penting :</p>\n\n<p>Harap tidak menanyakan tentang apakah bisa menggunakan pengiriman melalui Instan Kurir seperti Gosend dan Grab?</p>\n\n<p>Tidak Bisa karena kami tidak memakai jasa itu. Semua barang kami merupakan barang yang berpusat di Gudang Import Jakarta Center.</p>\n\n<p>Bagi yang melakukan proses order transaksi dan sudah dinyatakan masuk invoice pembayarannoleh Bukalapak akan kami proses pada hari itu juga dengan syarat sebelum jam 15.00 WIB (Tidak berlaku jika kami sedang overload pesanan)</p>\n\n<p>Update Resi : Kami biasa melakukan proses input resi pada malam hari dan pagi hari, jadi mohon bersabar apabila kami telat dalam melakukan input resi karena kami juga mempunyai beberapa pesanan yang harus kami tangani.</p>\n\n<p>Untuk pembelian barang yang harganya diatas ongkos kirim 10 kapi lipat (10x dari ongkir) diharap menggunakan jasa asuransi karena kami akan lebih mudah untuk melakukan proses klaim kepada ekspedisi logistik jika barang tersebut itu hilang atau terjadi hal-hal yang tidak diinginkan.</p>\n\n<p>Contoh : Untuk harga barang diatas Rp 360.000,00 dimohon menggunakan jasa asuransi dalam paket pembelian dan kami telah menyetting barang-barang yang dimaksud dengan otomatis wajib asuransi sehingga anda tidak perlu melakukan klik tombol asuransi atau jika memang ada beberapa barang yang belum kami setting anda bisa pilih sendiri menggunakan asuransi pada metode pembayaran di Bukalapak.</p>\n\n<p>Happy Shopping di Bukalapak bersama LA LM FOREVER!!!</p>\n","url":"https://www.bukalapak.com/u/tezar_vibryawan"},"tag_pages":[],"updated_at":"2020-08-20T10:25:01Z","url":"https://www.bukalapak.com/p/mobil-part-dan-aksesoris/aksesoris-mobil/aksesoris-interior/eu8dld-jual-car-holder-for-your-smart-phone-high-quality-product","video_url":"","warranty":{"cheapest":false},"weight":1200,"wholesales":[],"without_shipping":false,"qty":1}],"name":"","address":""}

    FirestoreModels.insertDummy(req.body)
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
		console.log(result)
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

exports.confirmPayment=(req, res)=>{
    let body = req.body
    body.userId = req.jwt.userId
    FirestoreModels.insert(body)
    .then(result=>{
        res.status(200).send(result)
    })
    .catch(()=>{
        res.status(400).send({msg : 'something error'})
    })
}

exports.findUserByToken=(req, res)=>{
    verifyUser.userInfo(req)
    .then(result=>{
        res.status(200).send(result)
    })
}

exports.graphql=(res, res)=>{
    // type Person {
    //     id: ID!
    //     name : String!
    //     age : Int!
    // }

    // type Author{
    //     id: ID!
    //     title : String!
    //     author : Person!
    // }
}
