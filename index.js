const express = require( 'express' );
require( 'dotenv' ).config();

const authRoutes = require( './src/routes/authRoutes' );
const { dbConnection } = require( './src/database/configDB' );

const app = express();

// Directorio público
app.use( express.static( 'public' ) );

app.use( express.json() );

// Rutas
app.use( '/api/auth', authRoutes );

// Init DB

dbConnection().then( () => {
	app.listen( process.env.PORT, () => {
		console.log( `Servidor corriendo en el puerto ${process.env.PORT}` );
	} );
} ).catch( e => {
	console.log( 'Error al inicializar DB' );
	console.log( e );
} );


