const {Router} = require('express')
const {logIn} = require('../controllers/logIn');

const router = Router();

router.get('/logIn', logIn)


module.exports = router;