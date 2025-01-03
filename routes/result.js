const express = require('express');
const router = express.Router();
const resultController = require('../controllers/result.js');

router.get('/getResults', resultController.getResults);
router.post('/submitAnswer', resultController.submitAnswer);

module.exports = router;
