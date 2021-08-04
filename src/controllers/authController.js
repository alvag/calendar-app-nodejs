const { response, request } = require( 'express' );
const bcrypt = require( 'bcryptjs' );
const User = require( '../models/user' );
const { generateJWT } = require( '../helpers/jwt' );

const register = async ( req = request, res = response ) => {

	try {
		const { email } = req.body;
		let user = await User.findOne( { email } );

		if ( user ) {
			return res.status( 400 ).json( {
				ok: false,
				message: 'El correo ya está registrado'
			} );
		}

		user = new User( req.body );
		const salt = bcrypt.genSaltSync();
		user.password = bcrypt.hashSync( user.password, salt );

		const token = await generateJWT( user.id, user.name );

		await user.save();

		res.status( 201 ).json( {
			ok: true,
			token,
			user: {
				uid: user.id,
				name: user.name,
			},
		} );

	} catch ( e ) {
		console.log( e );
		res.status( 500 ).json( {
			ok: false,
			message: 'Error al registrar el usuario'
		} );
	}


};

const login = async ( req = request, res = response ) => {

	try {

		const { email, password } = req.body;

		const user = await User.findOne( { email } );

		if ( !user ) {
			return res.status( 400 ).json( {
				ok: false,
				message: 'Credenciales incorrectas'
			} );
		}

		const isValidPassword = bcrypt.compareSync( password, user.password );

		if ( !isValidPassword ) {
			return res.status( 400 ).json( {
				ok: false,
				message: 'Credenciales incorrectas'
			} );
		}

		const token = await generateJWT( user.id, user.name );

		res.json( {
			ok: true,
			token,
			user: {
				uid: user.id,
				name: user.name,
			}
		} );

	} catch ( e ) {
		console.log( e );
		res.status( 500 ).json( {
			ok: false,
			message: 'Error al iniciar sesión'
		} );
	}

};

const refreshToken = async ( req, res = response ) => {

	try {
		const { user } = req;
		const token = await generateJWT( user.uid, user.name );

		res.json( {
			ok: true,
			token,
			user
		} );
	} catch ( e ) {
		res.status( 500 ).json( {
			ok: false
		} );
	}

};

module.exports = {
	register,
	login,
	refreshToken
};
