const express = require('express');

const router = express.Router();
const book = require('../controllers/Book');
const auth = require('../middleware/auth');
const authAdmin = require('../middleware/authAdmin');

router.get('/', auth, book.bookGetAll);
router.put('/update', authAdmin, book.bookUpdate);
router.put('/create', authAdmin, book.bookAddNew);
router.delete('/delete/:id', authAdmin, book.bookDeleteSingle);

module.exports = router;
