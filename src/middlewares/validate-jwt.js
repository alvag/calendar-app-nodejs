const { response, request } = require( 'express' );
const jwt = require( 'jsonwebtoken' );

const validateJWT = ( req = request, res = response, next ) => {

	const token = req.header( 'x-token' );

	if ( !token ) {
		return res.status( 401 ).json( {
			ok: false
		} );
	}

	try {
		const { uid, name } = jwt.verify( token, process.env.SECRET_JWT_SEED );

		req.user = { uid, name };

		next();
	} catch ( e ) {
		console.log( e );
		return res.status( 401 ).json( {
			ok: false
		} );
	}

};

module.exports = {
	validateJWT
};
