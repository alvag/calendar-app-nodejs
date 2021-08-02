const { response, request } = require( 'express' );
const User = require( '../models/user' );

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

		await user.save();

		res.status( 201 ).json( {
			ok: true,
			user: req.body,
		} );

	} catch ( e ) {
		console.log( e );
		res.status( 500 ).json( {
			ok: false,
			message: 'Error al registrar el usuario'
		} );
	}


};

const login = ( req = request, res = response ) => {

	res.json( {
		ok: true
	} );

};

const refreshToken = ( req = request, res = response ) => {
	res.json( {
		ok: true
	} );
};

module.exports = {
	register,
	login,
	refreshToken
};
