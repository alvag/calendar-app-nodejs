const mongoose = require( 'mongoose' );

const dbConnection = async () => {

	try {

		await mongoose.connect(
			process.env.DB_URL,
			{
				useNewUrlParser: true,
				useUnifiedTopology: true,
				useCreateIndex: true,
				useFindAndModify: false
			}
		);

		console.log( 'DB Online' );

	} catch ( e ) {
		throw e;
	}

};

module.exports = {
	dbConnection
};
