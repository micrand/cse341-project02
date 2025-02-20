const express = require('express');
const router = express.Router();

const bookController = require('../controllers/bookController');

//authentication
const { isAuthenticated } = require('../middleware/authenticate');
//

//get
router.get('/', bookController.getAll);

router.get('/:id', bookController.getSingle);

// post and put
router.post('/', isAuthenticated, bookController.createBook);

router.put('/:id', isAuthenticated, bookController.updateBook);

// delete
router.delete('/:id', isAuthenticated, bookController.deleteBook);

module.exports = router;