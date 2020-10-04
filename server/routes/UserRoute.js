const express = require('express');

const router = express.Router();
const user = require('../controllers/User');
const auth = require('../middleware/auth');

router.post('/login', user.userLogin);
router.put('/create', user.userCreate);
router.get('/cart', auth, user.userGetCart);
router.put('/cart', auth, user.userAddBookToCart);
router.put('/cart/remove', auth, user.userRemoveBookFromCart);
router.post('/checkEmail', user.userCheckEmailAvail);

module.exports = router;
