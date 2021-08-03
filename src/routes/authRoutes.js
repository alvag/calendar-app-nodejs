const express = require( 'express' );
const { check } = require( 'express-validator' );
const router = express.Router();

const { register, login, refreshToken } = require( '../controllers/authController' );
const { fieldValidators } = require( '../middlewares/field-validators' );
const { validateJWT } = require( '../middlewares/validate-jwt' );

router.post(
	'/register',
	[
		check( 'name', 'El nombre es obligatorio' ).not().isEmpty(),
		check( 'email', 'El correo no es válido' ).isEmail(),
		check( 'password', 'La contraseña es obligatoria' ).not().isEmpty(),
		check( 'password', 'El password debe tener al menos 6 caracteres' ).isLength( { min: 6 } ),
		fieldValidators
	],
	register
);

router.post(
	'/login',
	[
		check( 'email', 'El correo es obligatorio' ).not().isEmpty(),
		check( 'email', 'El correo no es válido' ).isEmail(),
		check( 'password', 'La contraseña es obligatoria' ).not().isEmpty(),
		fieldValidators
	],
	login
);
router.get( '/refresh-token', [validateJWT], refreshToken );

module.exports = router;
