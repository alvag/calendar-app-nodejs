const express = require( 'express' );
const { validateJWT } = require( '../middlewares/validate-jwt' );
const { getEvents, createEvent, updateEvent, deleteEvent } = require( '../controllers/eventsController' );
const { check } = require( 'express-validator' );
const { fieldValidators } = require( '../middlewares/field-validators' );
const { isDate } = require( '../helpers/custom-validators' );

const router = express.Router();

router.use( validateJWT );

router.get( '/', getEvents );
router.post( '/',
	[
		check( 'title', 'El título es obligatorio' ).not().isEmpty(),
		check( 'start', 'La fecha de inicio es obligatoria' ).not().isEmpty(),
		check( 'start', 'La fecha de inicio no es válida' ).custom( isDate ),
		check( 'end', 'La fecha de finalización es obligatoria' ).not().isEmpty(),
		check( 'end', 'La fecha de finalización no es válida' ).custom( isDate ),
		fieldValidators
	],
	createEvent
);
router.put( '/:id', updateEvent );
router.delete( '/:id', deleteEvent );

module.exports = router;
