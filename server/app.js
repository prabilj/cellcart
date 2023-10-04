const express = require('express');
const cors = require('cors')
const app = express();
const db = require('./config/db')

const bodyParser = require('body-parser');
const User = require('./controller/user_controller')
const { sendOTP, verifyOTP } = require('./controller/otp_controller')
const Product = require('./controller/product_controller')
const Cart = require('./controller/cart_controller')
const Wishlist = require('./controller/wishList_controller')
const { fileUpload } = require('./controller/file_upload')
app.use(cors())
app.use(bodyParser.json());
const multer = require('multer')



const storage = multer.memoryStorage();
const upload = multer({ storage: storage });



app.post('/signup', User.userSignUp)
app.post('/login', User.userLogIn)
app.get('/dislayuser', User.displayUser)
app.get('/user/:_id', User.getUser)
app.post('/user/changepassword',User.changePassword)
app.post("/user/resetPassword", User.resetPassword)
app.post('/logout', User.userLogOut)
app.post('/sentOtp', sendOTP)
app.post('/verifyOTP', verifyOTP)


app.post("/upload", upload.single('file'), fileUpload)





app.post('/newproduct', Product.newProduct)
app.post('/manyproducts', Product.newProducts)
app.get('/dislayproduct', Product.dislayProducts)
app.get('/dislayproduct/:_id', Product.getProduct)
app.delete('/deleteproduct/:productId', Product.deleteProduct)
app.put('/updateproduct/:productId', Product.updateProduct)
app.get('/search/:searchTerm', Product.searchProducts)



app.post('/addtocart', Cart.addToCart)
app.delete('/removecart/:cartId', Cart.deleteFromCart)
app.get('/displaycart/:userId', Cart.displayCart)
app.put('/updatequanity/:cartId', Cart.updateQuantity)

app.post('/addwishlist', Wishlist.addWishList)
app.get('/displayWishlist/:userId', Wishlist.displayWishlist)
app.delete('/removewishlist/:Id', Wishlist.deleteWishlist)



app.listen(3000, () => {
  console.log('Server started on port 3001');
});
