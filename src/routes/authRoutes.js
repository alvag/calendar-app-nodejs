const express = require( 'express' );
const { register, login, refreshToken } = require( '../controllers/authController' );
const router = express.Router();

router.post( '/register', register );
router.post( '/login', login );
router.get( '/refresh-token', refreshToken );

module.exports = router;
