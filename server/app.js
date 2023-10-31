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
const Order = require('./controller/order_controller')
const Address = require('./controller/user_address_controller')
const { fileUpload } = require('./controller/file_upload')
app.use(cors())
app.use(bodyParser.json());
const multer = require('multer')



const storage = multer.memoryStorage();
const upload = multer({ storage: storage });



app.post('/signup', User.userSignUp)
app.post('/login', User.userLogIn)
app.get('/users', User.displayUser)


app.get('/users/orders', Order.getOrders)
app.put('/users/orders/:orderId', Order.updateOrder)
app.get('/users/:_id', User.getUser)
app.put('/users/:_id', User.updateUser)
app.delete('/users/:_id', User.deleteUsers)
app.post('/users/changepassword', User.changePassword)
app.post("/users/resetPassword", User.resetPassword)
app.post('/logout', User.userLogOut)
app.post('/sentOtp', sendOTP)
app.post('/verifyOTP', verifyOTP)


app.post("/upload", upload.single('file'), fileUpload)





app.post('/products', Product.newProduct)
app.post('/manyproducts', Product.newProducts)
app.get('/products', Product.dislayProducts)
app.get('/products/:_id', Product.getProduct)
app.delete('/products/:productId', Product.deleteProduct)
app.put('/products/:productId', Product.updateProduct)
app.get('/search/:searchTerm', Product.searchProducts)



app.post('/users/:userId/carts', Cart.addToCart)
app.delete('/users/carts/:cartId', Cart.deleteFromCart)

app.get('/users/:userId/carts', Cart.displayCart)
app.put('/updatequanity/:cartId', Cart.updateQuantity)

app.post('/users/wishlist', Wishlist.addWishList)
app.get('/users/:userId/wishlist/', Wishlist.displayWishlist)
app.delete('/users/wishlist/:Id', Wishlist.deleteWishlist)


app.post('/users/:userId/orders', Order.createOrder)
app.get('/users/:userId/orders', Order.getOrderById)

app.post('/users/addaddress', Address.addAddress)



app.listen(3000, () => {
  console.log('Server started on port 3000');
});
