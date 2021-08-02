const { response, request } = require( 'express' );

const register = ( req = request, res = response ) => {
	res.json( {
		ok: true
	} );
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
