const moment = require( 'moment' );

const isDate = ( value ) => {
	if ( !value ) {
		return false;
	}

	const date = moment( new Date( value ) );
	return date.isValid();
};

module.exports = {
	isDate
};
