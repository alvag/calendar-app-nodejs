const express = require( 'express' );
require( 'dotenv' ).config();

const authRoutes = require( './src/routes/authRoutes' );

const app = express();

// Directorio público
app.use( express.static( 'public' ) );

// Rutas
app.use( '/api/auth', authRoutes );

app.listen( process.env.PORT, () => {
	console.log( `Servidor corriendo en el puerto ${process.env.PORT}` );
} );
